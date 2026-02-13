<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Deporte;
use App\Models\Municipio;

class UserSeeder extends Seeder
{

    public function run(): void
    {
        User::factory(10)->create()->each(function ($user) {
            $municipio = Municipio::inRandomOrder()->first();
            $user->perfil()->create([
                'avatar' => fake()->imageUrl(),
                'municipio_id' => $municipio?->id,
                'deporteFavorito' => Deporte::inRandomOrder()->first()?->nombre,
            ]);

            $deportes = Deporte::inRandomOrder()->take(rand(1, 3))->get();
            foreach ($deportes as $deporte) {
                $user->deportes()->attach($deporte->id, [
                    'nivel' => collect(['SS', 'S', 'A', 'B', 'C', 'D', 'E'])->random(),
                ]);
            }
        });
    }
}
