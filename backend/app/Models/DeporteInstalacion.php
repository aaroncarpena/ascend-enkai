<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class DeporteInstalacion extends Pivot
{
    use HasFactory;

    protected $table = 'deporte_instalacion';

    protected $fillable = ['deporte_id', 'instalacion_id', 'superficie', 'numPistas', 'precio'];

    public $timestamps = false;
}
