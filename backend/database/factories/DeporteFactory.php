<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;


class DeporteFactory extends Factory
{

    public function definition(): array
    {
        return [
            'nombre' => ucfirst($this->faker->word()),
            'descripcion' => $this->faker->sentence(),
        ];
    }
}
