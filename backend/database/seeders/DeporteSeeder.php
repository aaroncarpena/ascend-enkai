<?php

namespace Database\Seeders;

use App\Models\Deporte;
use Illuminate\Database\Seeder;

class DeporteSeeder extends Seeder
{

    public function run(): void
    {
        Deporte::factory(10)->create();
    }
}
