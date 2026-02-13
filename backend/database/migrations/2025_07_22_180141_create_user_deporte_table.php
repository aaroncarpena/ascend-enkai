<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('user_deporte', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('deporte_id')->constrained('deporte')->onDelete('cascade');
            $table->enum('nivel', ['SS', 'S', 'A', 'B', 'C', 'D', 'E'])->default('E');
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('user_deporte');
    }
};
