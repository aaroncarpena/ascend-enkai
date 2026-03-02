<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Instalacion;

class InstalacionSeeder extends Seeder
{
    public function run(): void
    {
        Instalacion::factory(10)->create();
    }
}
