<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Deporte extends Model
{

    use HasFactory;
    protected $table = 'deporte';

    protected $fillable = ['nombre', 'descripcion'];

    public function instalaciones(): BelongsToMany
    {
        return $this->belongsToMany(Instalacion::class, 'deporte_instalacion', 'deporte_id', 'instalacion_id')
            ->withPivot('superficie', 'numPistas', 'precio');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_deporte')
            ->withPivot('nivel')
            ->withTimestamps();
    }
}
