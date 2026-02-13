<?php

namespace Database\Factories;

use App\Models\Municipio;
use Illuminate\Database\Eloquent\Factories\Factory;


class PerfilFactory extends Factory
{

    public function definition(): array
    {
        return [
            'deporteFavorito' => $this->faker->word(),
            'avatar' => $this->faker->imageUrl(),
            'municipio_id' => Municipio::factory()
        ];
    }
}
