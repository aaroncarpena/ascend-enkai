<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return file_exists(public_path('index.html'))
        ? response()->file(public_path('index.html'))
        : view('welcome');
});

Route::post('login', [\App\Http\Controllers\API\AuthApiController::class, 'login']);
Route::post('register', [\App\Http\Controllers\API\AuthApiController::class, 'register']);

Route::get('/{any}', function () {
    return response()->file(public_path('index.html'));
})->where('any', '^(?!api|up).*$');
