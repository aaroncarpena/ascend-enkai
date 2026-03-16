<?php

use App\Http\Controllers\API\ReservaApiController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthApiController;
use App\Http\Controllers\API\UserApiController;
use App\Http\Controllers\API\DeporteApiController;
use App\Http\Controllers\API\InstalacionApiController;
use App\Http\Middleware\Propietario;
use App\Http\Middleware\RolAdmin;

Route::post('/register', [AuthApiController::class, 'register']);
Route::post('/login', [AuthApiController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthApiController::class, 'logout']);

    Route::get('/users/{id}', [UserApiController::class, 'show'])
        ->middleware(Propietario::class);
    Route::put('/users/{id}', [UserApiController::class, 'update'])
        ->middleware(Propietario::class);

    Route::post('/users/{user}/deportes/{deporte}', [UserApiController::class, 'addDeporte'])
        ->middleware(Propietario::class);
    Route::delete('/users/{user}/deportes/{deporte}', [UserApiController::class, 'removeDeporte'])
        ->middleware(Propietario::class);

    Route::get('/deportes', [DeporteApiController::class, 'index']);
    Route::get('/deportes/{id}', [DeporteApiController::class, 'show']);

    Route::get('/instalacion', [InstalacionApiController::class, 'index']);
    Route::get('/instalacion/{id}', [InstalacionApiController::class, 'show']);

    Route::get('/reserva/{id}', [ReservaApiController::class, 'show'])
        ->middleware(Propietario::class);
    Route::put('/reserva/{id}', [ReservaApiController::class, 'update'])
        ->middleware(Propietario::class);
    Route::delete('/reserva/{id}', [ReservaApiController::class, 'destroy'])
        ->middleware(Propietario::class);
    Route::post('/reserva', [ReservaApiController::class, 'store']);

    Route::middleware(RolAdmin::class)->group(function () {

        Route::get('/users', [UserApiController::class, 'index']);
        Route::delete('/users/{id}', [UserApiController::class, 'destroy']);

        Route::post('/deportes', [DeporteApiController::class, 'store']);
        Route::put('/deportes/{id}', [DeporteApiController::class, 'update']);
        Route::delete('/deportes/{id}', [DeporteApiController::class, 'destroy']);

        Route::post('/instalacion', [InstalacionApiController::class, 'store']);
        Route::put('/instalacion/{id}', [InstalacionApiController::class, 'update']);
        Route::delete('/instalacion/{id}', [InstalacionApiController::class, 'destroy']);
    });
});
