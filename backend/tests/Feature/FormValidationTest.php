<?php

namespace Tests\Feature;

use App\Models\Deporte;
use App\Models\Instalacion;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class FormValidationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_requires_matching_passwords_and_allows_a_one_character_name(): void
    {
        $payload = [
            'name' => 'a',
            'email' => 'a@example.com',
            'password' => 'password',
            'password_confirmation' => 'distinta',
            'telefono' => '612345678',
        ];

        $this->postJson('/api/register', $payload)
            ->assertUnprocessable()
            ->assertJsonValidationErrors('password');

        $payload['password_confirmation'] = 'password';

        $this->postJson('/api/register', $payload)->assertCreated();
        $this->assertDatabaseHas('users', ['name' => 'a']);
    }

    public function test_login_does_not_reapply_the_registration_password_length_rule(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('x'),
        ]);

        $this->postJson('/api/login', [
            'login' => $user->email,
            'password' => 'x',
        ])->assertOk();
    }

    public function test_match_creation_rejects_past_dates_and_unknown_levels(): void
    {
        $user = User::factory()->create();
        $sport = Deporte::factory()->create();
        $center = Instalacion::factory()->create();
        Sanctum::actingAs($user);

        $payload = [
            'deporte_id' => $sport->id,
            'instalacion_id' => $center->id,
            'fecha' => now()->subDay()->toDateString(),
            'hora_inicio' => '18:00',
            'hora_fin' => '19:00',
            'max_jugadores' => 4,
            'nivel' => 'Intermedio',
            'descripcion' => 'Partido de prueba',
        ];

        $this->postJson('/api/partidos', $payload)
            ->assertUnprocessable()
            ->assertJsonValidationErrors('fecha');

        $payload['fecha'] = now()->addDay()->toDateString();
        $payload['nivel'] = 'Inventado';

        $this->postJson('/api/partidos', $payload)
            ->assertUnprocessable()
            ->assertJsonValidationErrors('nivel');

        $payload['nivel'] = 'Intermedio';

        $this->postJson('/api/partidos', $payload)->assertCreated();
    }

    public function test_profile_rejects_a_favorite_sport_that_does_not_exist(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $this->putJson('/api/perfil', [
            'name' => $user->name,
            'email' => $user->email,
            'telefono' => '612345678',
            'deporteFavorito' => 'Deporte inventado',
        ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('deporteFavorito');
    }
}
