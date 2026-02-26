<?php

use App\Http\Controllers\API\ReservaApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthApiController;
use App\Http\Controllers\API\UserApiController;
use App\Http\Controllers\API\DeporteApiController;
use App\Http\Controllers\API\InstalacionApiController;


Route::post('/register', [AuthApiController::class, 'register']);
Route::post('/login', [AuthApiController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthApiController::class, 'logout']);

    Route::get('/users', [UserApiController::class, 'index']);
    Route::get('/users/{id}', [UserApiController::class, 'show']);
    Route::put('/users/{id}', [UserApiController::class, 'update']);
    Route::delete('/users/{id}', [UserApiController::class, 'destroy']);


    Route::get('/deportes', [DeporteApiController::class, 'index']);
    Route::get('/deportes/{id}', [DeporteApiController::class, 'show']);
    Route::post('/deportes', [DeporteApiController::class, 'store']);
    Route::put('/deportes/{id}', [DeporteApiController::class, 'update']);
    Route::delete('/deportes/{id}', [DeporteApiController::class, 'destroy']);

    Route::get('/instalacion', [InstalacionApiController::class, 'index']);
    Route::get('instalacion/{id}', [InstalacionApiController::class, 'show']);
    Route::post('/instalacion', [InstalacionApiController::class, 'store']);
    Route::put('/instalacion/{id}', [InstalacionApiController::class, 'update']);
    Route::delete('/instalacion/{id}', [InstalacionApiController::class, 'destroy']);

    Route::get('/reserva', [ReservaApiController::class, 'index']);
    Route::get('/reserva/{id}', [ReservaApiController::class, 'show']);
    Route::post('/reserva', [ReservaApiController::class, 'store']);
    Route::put('/reserva/{id}', [ReservaApiController::class, 'update']);
    Route::delete('/reserva/{id}', [ReservaApiController::class, 'destroy']);

    Route::post('/users/{user}/deportes/{deporte}', [UserApiController::class, 'addDeporte']);
    Route::delete('/users/{user}/deportes/{deporte}', [UserApiController::class, 'removeDeporte']);

    Route::post('/deportes/{deporte}/instalacion/{instalacion}', [UserApiController::class, 'addDeporte']);

});
