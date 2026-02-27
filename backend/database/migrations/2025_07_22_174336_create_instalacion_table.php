<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('instalacion', function (Blueprint $table) {
            $table->id();
            $table->foreignId('municipio_id')->constrained('municipio')->onDelete('cascade');
            $table->foreignId('horario_id')->constrained('horario')->onDelete('cascade');
            $table->string('nombre');
            $table->string('direccion');
            $table->decimal('precio', 5, 2);
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('instalacion');
    }
};
