<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('partidos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('deporte_id')->constrained('deportes')->onDelete('cascade');
            $table->foreignId('instalacion_id')->constrained('instalacion')->onDelete('cascade');
            $table->date('fecha');
            $table->time('hora_inicio');
            $table->time('hora_fin');
            $table->integer('max_jugadores')->default(10);
            $table->integer('jugadores_actuales')->default(1);
            $table->enum('estado', ['pendiente', 'confirmado', 'cancelado', 'jugado'])->default('pendiente');
            $table->text('descripcion')->nullable();
            $table->string('nivel', 50)->nullable(); // Ej: 'principiante', 'intermedio', 'avanzado'
            $table->decimal('precio_por_jugador', 8, 2)->nullable();
            $table->boolean('es_publico')->default(true);

            $table->timestamps();
            $table->index('fecha');
            $table->index('estado');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('partidos');
    }
};
