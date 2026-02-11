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
        Schema::create('user_amigos', function (Blueprint $table) {
            $table->foreignId('solicitante_id')->constrained('users');  // Usuario que envía solicitud
            $table->foreignId('receptor_id')->constrained('users');    // Usuario que recibe solicitud
            $table->enum('estado', ['pendiente', 'aceptada', 'rechazada'])->default('pendiente');
            $table->timestamps();

            $table->unique(['solicitante_id', 'receptor_id']);  // Evita duplicados
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_amigos');
    }
};
