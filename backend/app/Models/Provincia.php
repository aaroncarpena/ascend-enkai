<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Provincia extends Model
{
    use HasFactory;
    protected $table = 'provincia';

    protected $fillable = ['nombre', 'pais_id'];
    protected $hidden = ['created_at','updated_at'];

    public function pais(): BelongsTo
    {
        return $this->belongsTo(Pais::class, 'pais_id');
    }

    public function municipios(): HasMany
    {
        return $this->hasMany(Municipio::class, 'provincia_id');
    }

    public function perfiles(): HasMany
    {
        return $this->hasMany(Perfil::class, 'provincia_id');
    }
}
