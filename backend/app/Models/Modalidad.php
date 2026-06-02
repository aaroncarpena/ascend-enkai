<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Modalidad extends Model
{
    use HasFactory;

    protected $table = 'modalidades';

    protected $fillable = ['nombre', 'descripcion'];

    public function deportes(): BelongsToMany
    {
        return $this->belongsToMany(Deporte::class, 'deporte_modalidad', 'modalidad_id', 'deporte_id')
                    ->withPivot('min_jugadores', 'max_jugadores');
    }
}
