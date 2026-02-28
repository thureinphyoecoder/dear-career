<?php

use App\Models\CareerJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::get('/health', fn() => response()->json(['ok' => true]));

/**
 * Public: list jobs (filters + pagination)
 * GET /api/jobs?category=&type=&mode=&q=
 */
Route::get('/jobs', function (Request $req) {
    $q = CareerJob::query()->where('is_active', true);

    if ($req->filled('category')) $q->where('category', $req->string('category'));
    if ($req->filled('type'))     $q->where('employment_type', $req->string('type'));
    if ($req->filled('mode'))     $q->where('work_mode', $req->string('mode'));

    // simple search (title/company/location)
    if ($req->filled('q')) {
        $kw = trim((string) $req->string('q'));
        if ($kw !== '') {
            $q->where(function ($w) use ($kw) {
                $w->where('title', 'ilike', "%{$kw}%")
                    ->orWhere('company', 'ilike', "%{$kw}%")
                    ->orWhere('location', 'ilike', "%{$kw}%");
            });
        }
    }

    return $q->orderByDesc('published_at')
        ->orderByDesc('id')
        ->paginate(20);
});

/**
 * Public: job detail
 */
Route::get('/jobs/{job}', function (CareerJob $job) {
    abort_unless($job->is_active, 404);
    return $job;
});

/**
 * Admin: create job (trusted_sources allowlist + fingerprint dedupe)
 * POST /api/admin/jobs
 * Header: X-Admin-Key: <ADMIN_API_KEY>
 */
Route::post('/admin/jobs', function (Request $req) {
    $data = $req->validate([
        'source_slug' => ['required', 'string', 'max:50'],
        'source_url' => ['required', 'string', 'max:2048'],

        'title' => ['required', 'string', 'max:255'],
        'company' => ['nullable', 'string', 'max:255'],
        'location' => ['nullable', 'string', 'max:255'],
        'employment_type' => ['nullable', 'string', 'max:50'],
        'work_mode' => ['nullable', 'string', 'max:50'],
        'category' => ['nullable', 'string', 'max:100'],
        'salary' => ['nullable', 'string', 'max:100'],

        'description_mm' => ['nullable', 'string'],
        'description_en' => ['nullable', 'string'],

        'apply_url' => ['nullable', 'string', 'max:2048'],
        'apply_email' => ['nullable', 'string', 'max:255'],
        'apply_phone' => ['nullable', 'string', 'max:50'],

        'published_at' => ['nullable', 'date'],
        'expires_at' => ['nullable', 'date'],

        'is_verified_source' => ['sometimes', 'boolean'],
        'is_active' => ['sometimes', 'boolean'],
    ]);

    // 1) source_slug must exist and active
    $source = DB::table('trusted_sources')
        ->where('is_active', true)
        ->where('slug', $data['source_slug'])
        ->first();

    if (!$source) {
        return response()->json(['message' => 'Invalid source_slug'], 422);
    }

    // 2) domain must match source_url host
    $host = parse_url($data['source_url'], PHP_URL_HOST) ?? '';
    $host = strtolower(preg_replace('/^www\./', '', $host));
    $domain = strtolower($source->domain);

    $okDomain = ($host === $domain || str_ends_with($host, '.' . $domain));
    if (!$okDomain) {
        return response()->json([
            'message' => 'Source domain mismatch',
            'host' => $host,
            'expected' => $domain,
        ], 422);
    }

    // server-set canonical source name
    $data['source'] = $source->name;

    // 3) fingerprint normalize (host + path only, ignore query)
    $u = parse_url($data['source_url']);
    $path = $u['path'] ?? '';
    $norm = $host . rtrim($path, '/');

    $fingerprintBase = mb_strtolower(($data['title'] ?? '') . '|' . ($data['company'] ?? '') . '|' . $norm);
    $data['fingerprint'] = hash('sha256', $fingerprintBase);

    // 4) dedupe: if exists return 200
    $existing = CareerJob::where('fingerprint', $data['fingerprint'])->first();
    if ($existing) return response()->json($existing, 200);

    // 5) create new
    $job = CareerJob::create($data);

    return response()->json($job, 201);
})->middleware('admin.key');
