<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('horario', function (Blueprint $table) {
            $table->id();
            $table->time('hora_apertura');
            $table->time('hora_cierre');
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('horario');
    }
};
