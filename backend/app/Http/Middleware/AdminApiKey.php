<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminApiKey
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Prefer custom header; optional fallback: Authorization: Bearer <key>
        $provided = $request->header('X-Admin-Key');

        if (!$provided) {
            $auth = $request->header('Authorization', '');
            if (str_starts_with($auth, 'Bearer ')) {
                $provided = substr($auth, 7);
            }
        }

        $expected = (string) config('admin.api_key', '');

        // Always same response
        if ($expected === '' || $provided === '') {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Constant-time compare
        if (!hash_equals($expected, $provided)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
