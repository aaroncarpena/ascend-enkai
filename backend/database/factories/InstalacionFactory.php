<?php

namespace Database\Factories;

use App\Models\Instalacion;
use App\Models\Municipio;
use Illuminate\Database\Eloquent\Factories\Factory;

class InstalacionFactory extends Factory
{
    protected $model = Instalacion::class;

    public function definition()
    {
        return [
            'municipio_id' => Municipio::factory(),
            'nombre' => $this->faker->company(),
            'direccion' => $this->faker->address(),
            'precio' => $this->faker->randomFloat(2,1,9999),
            'horario_apertura' => $this->faker->time(),
            'horario_clausura' => $this->faker->time()
        ];
    }
}

