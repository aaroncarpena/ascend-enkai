<?php

namespace Database\Factories;

use App\Models\Pais;
use Illuminate\Database\Eloquent\Factories\Factory;


class ProvinciaFactory extends Factory
{

    public function definition(): array
    {
        return [
            'nombre' => $this->faker->state(),
            'pais_id' => Pais::factory()
        ];
    }
}
