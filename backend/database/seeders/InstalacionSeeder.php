<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Instalacion;
use App\Models\Horario;

class InstalacionSeeder extends Seeder
{
    public function run(): void
    {
        $horarios = Horario::all();

        if ($horarios->isEmpty()) {
            $this->command->info('No hay horarios. Ejecuta primero el HorarioSeeder.');
            return;
        }

        for ($i = 0; $i < 5; $i++) {
            Instalacion::factory()->create([
                'horario_id' => $horarios->random()->id,
            ]);
        }
    }
}
