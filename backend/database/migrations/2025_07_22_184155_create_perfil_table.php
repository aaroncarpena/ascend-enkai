<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('perfil', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('municipio_id')->nullable()->constrained('municipio')->nullOnDelete();
            $table->foreignId('provincia_id')->nullable()->constrained('provincia')->nullOnDelete();
            $table->foreignId('pais_id')->nullable()->constrained('pais')->nullOnDelete();
            $table->string('deporteFavorito')->nullable();
            $table->string('avatar');
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('perfil');
    }
};
