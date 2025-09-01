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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->string('custom_id')->unique();
            $table->string('name');
            $table->string('positions');
            $table->string('room');
            $table->string('facility');
            $table->string('description');
            $table->string('status');
            $table->string('note');
            $table->foreignId('created_by')
                  ->constrained('users')
                  ->onDelete('cascade');
            $table->foreignId('updated_by')
            ->nullable()             
            ->constrained('users')
            ->onDelete('set null');  
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
