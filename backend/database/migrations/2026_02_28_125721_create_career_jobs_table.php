<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('career_jobs', function (Blueprint $table) {
            $table->id();

            // Source tracking (anti-scam + dedupe)
            $table->string('source');                 // e.g. "jobthai", "linkedin", "facebook"
            $table->string('source_url');             // original post URL
            $table->string('source_id')->nullable();  // if source provides id
            $table->string('fingerprint', 64)->unique(); // sha256(title+company+url) for dedupe

            // Content
            $table->string('title');
            $table->string('company')->nullable();
            $table->string('location')->nullable();
            $table->string('employment_type')->nullable(); // full-time/part-time/contract/intern
            $table->string('work_mode')->nullable();       // onsite/remote/hybrid
            $table->string('category')->nullable();        // ngo/white-collar/blue-collar/it...
            $table->string('salary')->nullable();

            // EN/MM (bilingual)
            $table->text('description_mm')->nullable();
            $table->text('description_en')->nullable();

            // Apply
            $table->string('apply_url')->nullable();
            $table->string('apply_email')->nullable();
            $table->string('apply_phone')->nullable();

            // Moderation + trust
            $table->boolean('is_verified_source')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamp('published_at')->nullable();
            $table->timestamp('expires_at')->nullable();

            $table->timestamps();

            $table->index(['is_active', 'published_at']);
            $table->index(['category', 'employment_type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('career_jobs');
    }
};
