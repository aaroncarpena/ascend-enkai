<?php

use App\Http\Controllers\API\ReservaApiController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthApiController;
use App\Http\Controllers\API\UserApiController;
use App\Http\Controllers\API\DeporteApiController;
use App\Http\Controllers\API\InstalacionApiController;
use App\Http\Controllers\API\MunicipioApiController;
use App\Http\Controllers\API\PartidoApiController;
use App\Http\Middleware\Propietario;
use App\Http\Middleware\RolAdmin;

Route::post('/register', [AuthApiController::class, 'register']);
Route::post('/login', [AuthApiController::class, 'login'])->name('login');

// Rutas públicas
Route::get('/deportes', [DeporteApiController::class, 'index']);
Route::get('/deportes/{id}', [DeporteApiController::class, 'show']);
Route::get('/deportes/{deporte}/partidos', [PartidoApiController::class, 'bySport']);
Route::get('/instalacion', [InstalacionApiController::class, 'index']);
Route::get('/instalacion/{id}', [InstalacionApiController::class, 'show']);
Route::get('/instalacion/{instalacion}/partidos', [PartidoApiController::class, 'bySportCenter']);
Route::get('/municipios', [MunicipioApiController::class, 'index']);
Route::get('/partidos', [PartidoApiController::class, 'index']);
Route::get('/partidos/{partido}', [PartidoApiController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthApiController::class, 'logout']);
    Route::get('/perfil', [UserApiController::class, 'profile']);
    Route::put('/perfil', [UserApiController::class, 'updateProfile']);
    Route::post('/perfil/avatar', [UserApiController::class, 'uploadAvatar']);
    Route::get('/mis-partidos', [PartidoApiController::class, 'mine']);
    Route::post('/partidos', [PartidoApiController::class, 'store']);
    Route::post('/partidos/{partido}/unirse', [PartidoApiController::class, 'join']);
    Route::delete('/partidos/{partido}/unirse', [PartidoApiController::class, 'leave']);

    Route::get('/users/{id}', [UserApiController::class, 'show'])
        ->middleware(Propietario::class);
    Route::put('/users/{id}', [UserApiController::class, 'update'])
        ->middleware(Propietario::class);

    Route::post('/users/{user}/deportes/{deporte}', [UserApiController::class, 'addDeporte'])
        ->middleware(Propietario::class);
    Route::delete('/users/{user}/deportes/{deporte}', [UserApiController::class, 'removeDeporte'])
        ->middleware(Propietario::class);

    Route::get('/reserva/{id}', [ReservaApiController::class, 'show'])
        ->middleware(Propietario::class);
    Route::put('/reserva/{id}', [ReservaApiController::class, 'update'])
        ->middleware(Propietario::class);
    Route::delete('/reserva/{id}', [ReservaApiController::class, 'destroy'])
        ->middleware(Propietario::class);
    Route::post('/reserva', [ReservaApiController::class, 'store']);

    Route::middleware(RolAdmin::class)->group(function () {
        Route::post('/deportes', [DeporteApiController::class, 'store']);
        Route::put('/deportes/{id}', [DeporteApiController::class, 'update']);
        Route::delete('/deportes/{id}', [DeporteApiController::class, 'destroy']);

        Route::prefix('admin')->group(function () {
            Route::get('/users', [UserApiController::class, 'index']);
            Route::patch('/users/{user}/role', [UserApiController::class, 'updateRole']);
            Route::delete('/users/{user}', [UserApiController::class, 'destroy']);

            Route::get('/instalaciones', [InstalacionApiController::class, 'adminIndex']);
            Route::post('/instalaciones', [InstalacionApiController::class, 'store']);
            Route::put('/instalaciones/{instalacion}', [InstalacionApiController::class, 'update']);
            Route::delete('/instalaciones/{instalacion}', [InstalacionApiController::class, 'destroy']);
        });
    });
});
