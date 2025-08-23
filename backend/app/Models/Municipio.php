<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Municipio extends Model
{
    use HasFactory;
    protected $table = 'municipio';

    protected $fillable = ['nombre', 'codigoPostal', 'provincia_id'];

    public function provincia(): BelongsTo
    {
        return $this->belongsTo(Provincia::class, 'provincia_id');
    }

    public function instalaciones(): HasMany
    {
        return $this->hasMany(Instalacion::class, 'municipio_id');
    }

    public function perfiles()
    {
        return $this->hasMany(Perfil::class, 'municipio_id');
    }
}
