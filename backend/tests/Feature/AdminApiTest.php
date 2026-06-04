<?php

namespace Tests\Feature;

use App\Models\Municipio;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_regular_user_cannot_access_admin_routes(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $this->getJson('/api/admin/users')->assertForbidden();
        $this->getJson('/api/admin/instalaciones')->assertForbidden();
    }

    public function test_admin_can_list_and_delete_users_but_not_themselves(): void
    {
        $admin = User::factory()->create(['rol' => User::ROLE_ADMIN]);
        $user = User::factory()->create();
        Sanctum::actingAs($admin);

        $this->getJson('/api/admin/users')
            ->assertOk()
            ->assertJsonFragment(['email' => $user->email]);

        $this->deleteJson("/api/admin/users/{$admin->id}")->assertUnprocessable();
        $this->deleteJson("/api/admin/users/{$user->id}")->assertOk();

        $this->assertDatabaseMissing('users', ['id' => $user->id]);
        $this->assertDatabaseHas('users', ['id' => $admin->id]);
    }

    public function test_admin_can_create_update_and_delete_sport_centers(): void
    {
        $admin = User::factory()->create(['rol' => User::ROLE_ADMIN]);
        $municipio = Municipio::factory()->create();
        Sanctum::actingAs($admin);

        $payload = [
            'nombre' => 'Centro de prueba',
            'direccion' => 'Calle Prueba 1',
            'precio' => 10,
            'municipio_id' => $municipio->id,
            'horario_apertura' => '08:00',
            'horario_clausura' => '22:00',
        ];

        $created = $this->postJson('/api/admin/instalaciones', $payload)
            ->assertCreated()
            ->json();

        $payload['nombre'] = 'Centro actualizado';

        $this->putJson("/api/admin/instalaciones/{$created['id']}", $payload)
            ->assertOk()
            ->assertJsonFragment(['nombre' => 'Centro actualizado']);

        $this->deleteJson("/api/admin/instalaciones/{$created['id']}")->assertOk();
        $this->assertDatabaseMissing('instalacion', ['id' => $created['id']]);
    }

    public function test_public_registration_always_creates_a_regular_user(): void
    {
        $this->postJson('/api/register', [
            'name' => 'nuevo_usuario',
            'email' => 'nuevo@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'telefono' => '600000000',
            'rol' => User::ROLE_ADMIN,
            'account_type' => 'instalacion',
        ])->assertCreated();

        $this->assertDatabaseHas('users', [
            'email' => 'nuevo@example.com',
            'rol' => User::ROLE_USER,
        ]);
    }
}
