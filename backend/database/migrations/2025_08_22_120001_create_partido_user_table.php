<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('partido_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('partido_id')->constrained('partidos')->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('estado', ['pendiente', 'confirmado', 'cancelado'])->default('confirmado');
            $table->timestamp('unido_en')->useCurrent();

            $table->unique(['partido_id', 'user_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('partido_user');
    }
};
