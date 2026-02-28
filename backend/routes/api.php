<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Models\CareerJob;

Route::get('/health', function () {
    return response()->json(['ok' => true]);
});

/**
 * Public: list jobs
 * GET /api/jobs?category=&type=&mode=&q=&page=
 */
Route::get('/jobs', function (Request $req) {
    $q = CareerJob::query()
        ->where('is_active', true)
        ->where(function ($qq) {
            // expires_at null OR expires_at > now
            $qq->whereNull('expires_at')
                ->orWhere('expires_at', '>', now());
        });

    // filters
    if ($req->filled('category')) {
        $q->where('category', $req->string('category')->toString());
    }
    if ($req->filled('type')) {
        $q->where('employment_type', $req->string('type')->toString());
    }
    if ($req->filled('mode')) {
        $q->where('work_mode', $req->string('mode')->toString());
    }

    // simple search (optional)
    if ($req->filled('q')) {
        $kw = trim($req->string('q')->toString());
        if ($kw !== '') {
            $q->where(function ($qq) use ($kw) {
                $qq->where('title', 'ilike', "%{$kw}%")
                    ->orWhere('company', 'ilike', "%{$kw}%")
                    ->orWhere('location', 'ilike', "%{$kw}%");
            });
        }
    }

    // pagination size guard
    $perPage = (int) ($req->query('per_page', 20));
    if ($perPage < 1) $perPage = 20;
    if ($perPage > 50) $perPage = 50;

    return $q->orderByDesc('published_at')
        ->orderByDesc('id')
        ->paginate($perPage);
});

/**
 * Public: view job
 * GET /api/jobs/{job}
 */
Route::get('/jobs/{job}', function (CareerJob $job) {
    abort_unless($job->is_active, 404);
    if ($job->expires_at && $job->expires_at <= now()) abort(404);
    return response()->json($job);
});

/**
 * Admin: create (idempotent by fingerprint)
 * POST /api/admin/jobs
 *
 * Headers:
 *   X-Admin-Key: <secret>
 */
Route::post('/admin/jobs', function (Request $req) {

    $data = $req->validate([
        // client sends source_slug + url only; server sets source
        'source_slug' => ['required', 'string', 'max:50'],
        'source_url'  => ['required', 'url', 'max:2048'],

        'source_id'   => ['nullable', 'string', 'max:255'], // optional external id

        'title' => ['required', 'string', 'max:255'],
        'company' => ['nullable', 'string', 'max:255'],
        'location' => ['nullable', 'string', 'max:255'],
        'employment_type' => ['nullable', 'string', 'max:50'],
        'work_mode' => ['nullable', 'string', 'max:50'],
        'category' => ['nullable', 'string', 'max:100'],
        'salary' => ['nullable', 'string', 'max:100'],

        'description_mm' => ['nullable', 'string'],
        'description_en' => ['nullable', 'string'],

        'apply_url' => ['nullable', 'url', 'max:2048'],
        'apply_email' => ['nullable', 'string', 'max:255'],
        'apply_phone' => ['nullable', 'string', 'max:50'],

        'published_at' => ['nullable', 'date'],
        'expires_at' => ['nullable', 'date'],

        'is_verified_source' => ['sometimes', 'boolean'],
        'is_active' => ['sometimes', 'boolean'],
    ]);

    // 1) source_slug must exist and active
    $source = DB::table('trusted_sources')
        ->select(['id', 'name', 'slug', 'domain', 'is_active'])
        ->where('is_active', true)
        ->where('slug', $data['source_slug'])
        ->first();

    if (!$source) {
        return response()->json(['message' => 'Invalid source_slug'], 422);
    }

    // 2) domain must match source_url host
    $u = parse_url($data['source_url']);
    if ($u === false) {
        return response()->json(['message' => 'Invalid source_url'], 422);
    }

    $host = strtolower($u['host'] ?? '');
    $host = preg_replace('/^www\./', '', $host);
    $domain = strtolower($source->domain);

    $okDomain = ($host === $domain || str_ends_with($host, '.' . $domain));
    if (!$okDomain) {
        return response()->json([
            'message' => 'Source domain mismatch',
            'host' => $host,
            'expected' => $domain,
        ], 422);
    }

    // 3) server-set canonical source name
    $data['source'] = $source->name;

    // 4) published_at default
    if (empty($data['published_at'])) {
        $data['published_at'] = now();
    }

    // 5) fingerprint normalize (host + path only, ignore query)
    $path = $u['path'] ?? '';
    $path = rtrim($path, '/');
    $norm = $host . $path;

    $fpBase = mb_strtolower(
        trim(($data['title'] ?? '')) . '|' .
            trim(($data['company'] ?? '')) . '|' .
            $norm
    );
    $data['fingerprint'] = hash('sha256', $fpBase);

    // 6) dedupe first (fast path)
    $existing = CareerJob::where('fingerprint', $data['fingerprint'])->first();
    if ($existing) {
        return response()->json($existing, 200);
    }

    // 7) create (race-safe if fingerprint is unique in DB)
    try {
        $job = CareerJob::create($data);
        return response()->json($job, 201);
    } catch (\Illuminate\Database\QueryException $e) {
        // if unique constraint hit, return existing
        $existing = CareerJob::where('fingerprint', $data['fingerprint'])->first();
        if ($existing) return response()->json($existing, 200);
        throw $e;
    }
})->middleware('admin.key');
