<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Partido extends Model
{
    use HasFactory;

    protected $table = 'partidos';

    protected $fillable = [
        'user_id',
        'deporte_id',
        'instalacion_id',
        'fecha',
        'hora_inicio',
        'hora_fin',
        'max_jugadores',
        'jugadores_actuales',
        'estado',
        'descripcion',
        'nivel',
        'precio_por_jugador',
        'es_publico',
    ];

    protected $casts = [
        'fecha' => 'date',
        'es_publico' => 'boolean',
        'precio_por_jugador' => 'decimal:2',
    ];

    public function creador(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function deporte(): BelongsTo
    {
        return $this->belongsTo(Deporte::class, 'deporte_id');
    }

    public function instalacion(): BelongsTo
    {
        return $this->belongsTo(Instalacion::class, 'instalacion_id');
    }

    public function jugadores(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'partido_user', 'partido_id', 'user_id')
                    ->withPivot('estado', 'unido_en')
                    ->withTimestamps();
    }
}
