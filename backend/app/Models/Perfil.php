<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Perfil extends Model
{
    use HasFactory;
    protected $table = 'perfil';

    protected $fillable = [
        'user_id', 'municipio_id', 'provincia_id', 'pais_id',
        'deporteFavorito', 'avatar'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }


}
