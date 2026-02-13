<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('deporte_instalacion', function (Blueprint $table) {
            $table->foreignId('deporte_id')->constrained('deporte')->onDelete('cascade');
            $table->foreignId('instalacion_id')->constrained('instalacion')->onDelete('cascade');
            $table->string('superficie');
            $table->integer('numPistas');
            $table->decimal('precio', 8,2);
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('deporte_instalacion');
    }
};
