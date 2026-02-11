<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class UserAmigos extends Pivot
{
    use HasFactory;
    protected $table = 'user_amigos';

    protected $fillable = ['solicitante_id', 'receptor_id', 'estado'];

    public $timestamps = true;
}
