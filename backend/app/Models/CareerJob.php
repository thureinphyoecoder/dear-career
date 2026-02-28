<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CareerJob extends Model
{
    protected $table = 'career_jobs';

    protected $fillable = [
        'source',
        'source_slug',
        'source_url',
        'source_id',
        'fingerprint',
        'title',
        'company',
        'location',
        'employment_type',
        'work_mode',
        'category',
        'salary',
        'description_mm',
        'description_en',
        'apply_url',
        'apply_email',
        'apply_phone',
        'is_verified_source',
        'is_active',
        'published_at',
        'expires_at',
    ];

    protected $casts = [
        'is_verified_source' => 'boolean',
        'is_active' => 'boolean',
        'published_at' => 'datetime',
        'expires_at' => 'datetime',
    ];
}
