<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthApiController;
use App\Http\Controllers\API\UserApiController;
use App\Http\Controllers\API\DeporteApiController;


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

    Route::post('/users/{user}/deportes/{deporte}', [UserApiController::class, 'addDeporte']); // Añadir deporte a usuario
    Route::delete('/users/{user}/deportes/{deporte}', [UserApiController::class, 'removeDeporte']); // Quitar deporte a usuario
});
