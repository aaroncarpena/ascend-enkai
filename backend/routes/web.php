<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

use App\Http\Controllers\API\AuthApiController;

Route::post('login', [\App\Http\Controllers\API\AuthApiController::class, 'login']);
Route::post('register', [\App\Http\Controllers\API\AuthApiController::class, 'register']);
