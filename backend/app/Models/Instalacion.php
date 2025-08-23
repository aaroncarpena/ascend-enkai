<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Instalacion extends Model
{
    use HasFactory;
    protected $table = 'instalacion';

    protected $fillable = ['municipio_id', 'nombre', 'direccion'];

    public function municipio(): BelongsTo
    {
        return $this->belongsTo(Municipio::class, 'municipio_id');
    }

    public function reservas(): HasMany
    {
        return $this->hasMany(Reserva::class, 'instalacion_id');
    }

    public function deportes(): BelongsToMany
    {
        return $this->belongsToMany(Deporte::class, 'deporte_instalacion', 'instalacion_id', 'deporte_id')
            ->withPivot('superficie', 'numPistas', 'precio');
    }
}
