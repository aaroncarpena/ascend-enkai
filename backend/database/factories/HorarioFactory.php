<?php

namespace Database\Factories;

use App\Models\Horario;
use Illuminate\Database\Eloquent\Factories\Factory;

class HorarioFactory extends Factory
{
    protected $model = Horario::class;

    public function definition()
    {
        $apertura = $this->faker->time('H:i:s', '12:00:00');
        $cierre = $this->faker->time('H:i:s', '23:59:00');

        if ($cierre <= $apertura) {
            $cierre = date('H:i:s', strtotime($apertura . ' +4 hours'));
        }

        return [
            'hora_apertura' => $apertura,
            'hora_cierre' => $cierre,
        ];
    }
}
