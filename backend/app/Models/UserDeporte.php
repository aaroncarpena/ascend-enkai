<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class UserDeporte extends Pivot
{
    use HasFactory;
    protected $table = 'user_deporte';

    protected $fillable = ['user_id', 'deporte_id', 'nivel'];

    public $timestamps = true;
}
