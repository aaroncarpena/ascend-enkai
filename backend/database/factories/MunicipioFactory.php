<?php

namespace Database\Factories;

use App\Models\Provincia;
use Illuminate\Database\Eloquent\Factories\Factory;


class MunicipioFactory extends Factory
{

    public function definition(): array
    {
        return [
            'nombre' => $this->faker->city(),
            'codigo' => $this->faker->postcode(),
            'provincia_id' => Provincia::factory()
        ];
    }
}
