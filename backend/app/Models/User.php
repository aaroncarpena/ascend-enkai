<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Sanctum\PersonalAccessToken;

class User extends Authenticatable
{
    use Notifiable;
    use HasApiTokens;
    use HasFactory;

    protected $fillable = [
        'name', 'email', 'password', 'telefono', 'rol'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function deportes(): BelongsToMany
    {
        return $this->belongsToMany(Deporte::class, 'user_deporte')
            ->withPivot('nivel')
            ->withTimestamps();
    }

    public function amigos(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_amigos', 'solicitante_id', 'receptor_id')
            ->withPivot('estado')
            ->withTimestamps();
    }

    public function reservas(): HasMany
    {
        return $this->hasMany(Reserva::class, 'user_id');
    }

    public function perfil(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Perfil::class, 'user_id');
    }
    public function tokens()
    {
        return $this->morphMany(PersonalAccessToken::class, 'tokenable');
    }

}
