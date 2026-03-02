<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            PaisSeeder::class,
            ProvinciaSeeder::class,
            MunicipioSeeder::class,
            DeporteSeeder::class,
            HorarioSeeder::class,
            InstalacionSeeder::class,
            UserSeeder::class,
        ]);
    }
}
