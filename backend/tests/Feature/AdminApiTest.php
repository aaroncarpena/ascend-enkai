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

    public function test_admin_can_change_other_users_roles_but_not_their_own(): void
    {
        $admin = User::factory()->create(['rol' => User::ROLE_ADMIN]);
        $user = User::factory()->create();
        Sanctum::actingAs($admin);

        $this->patchJson("/api/admin/users/{$user->id}/role", [
            'rol' => User::ROLE_ADMIN,
        ])
            ->assertOk()
            ->assertJsonFragment(['rol' => User::ROLE_ADMIN]);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'rol' => User::ROLE_ADMIN,
        ]);

        $this->patchJson("/api/admin/users/{$admin->id}/role", [
            'rol' => User::ROLE_USER,
        ])->assertUnprocessable();

        $this->patchJson("/api/admin/users/{$user->id}/role", [
            'rol' => 'otro',
        ])->assertUnprocessable();
    }

    public function test_admin_can_create_update_and_delete_sport_centers(): void
    {
        $admin = User::factory()->create(['rol' => User::ROLE_ADMIN]);
        $municipio = Municipio::factory()->create();
        Sanctum::actingAs($admin);

        $payload = [
            'nombre' => 'Centro de prueba',
            'direccion' => 'Calle Prueba 1',
            'municipio_id' => $municipio->id,
            'horario_apertura' => '08:00',
            'horario_clausura' => '08:00',
        ];

        $this->postJson('/api/admin/instalaciones', $payload)
            ->assertUnprocessable()
            ->assertJsonValidationErrors('horario_clausura');

        $payload['horario_clausura'] = '00:00';

        $created = $this->postJson('/api/admin/instalaciones', $payload)
            ->assertCreated()
            ->assertJsonFragment(['precio' => 0])
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

    public function test_phone_number_must_contain_exactly_nine_digits(): void
    {
        $payload = [
            'name' => 'telefono_invalido',
            'email' => 'telefono@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'telefono' => '12345678',
        ];

        $this->postJson('/api/register', $payload)
            ->assertUnprocessable()
            ->assertJsonValidationErrors('telefono');

        $payload['telefono'] = '612345678';

        $this->postJson('/api/register', $payload)->assertCreated();
    }

    public function test_profile_requires_a_nine_digit_phone_number(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $payload = [
            'name' => $user->name,
            'email' => $user->email,
            'telefono' => '12345678',
        ];

        $this->putJson('/api/perfil', $payload)
            ->assertUnprocessable()
            ->assertJsonValidationErrors('telefono');

        $payload['telefono'] = '612345678';

        $this->putJson('/api/perfil', $payload)->assertOk();
    }
}
