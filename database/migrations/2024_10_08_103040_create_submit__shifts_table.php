<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('submit__shifts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('worker_id')->constrained();
            $table->dateTime('start_at');  
            $table->dateTime('end_at');  

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submit__shifts');
    }
};