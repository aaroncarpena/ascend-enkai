<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;


class PaisFactory extends Factory
{

    public function definition(): array
    {
        return [
            'nombre' => $this->faker->country(),
        ];
    }
}
