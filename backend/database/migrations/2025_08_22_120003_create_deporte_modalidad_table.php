<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('deporte_modalidad', function (Blueprint $table) {
            $table->id();
            $table->foreignId('deporte_id')->constrained('deporte')->onDelete('cascade');
            $table->foreignId('modalidad_id')->constrained('modalidades')->onDelete('cascade');
            $table->integer('min_jugadores')->default(1);
            $table->integer('max_jugadores')->default(1);

            $table->unique(['deporte_id', 'modalidad_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('deporte_modalidad');
    }
};
