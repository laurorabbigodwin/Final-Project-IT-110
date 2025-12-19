<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LikedQuoteController;

/*
|--------------------------------------------------------------------------
| Home (Inertia SPA)
|--------------------------------------------------------------------------
*/
Route::get('/', function (App\Services\AffirmationService $service) {

    return Inertia::render('Home', [
        'quote' => $service->getQuote(),
        'likedQuotes' => auth()->check()
            ? auth()->user()->likedQuotes()->latest()->get()
            : [],
    ]);
});

/*
|--------------------------------------------------------------------------
| Authentication Actions (NO PAGES)
|--------------------------------------------------------------------------
*/
Route::middleware('guest')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    /*
    |--------------------------------------------------------------------------
    | ❤️ Liked Quotes — FULL CRUD
    |--------------------------------------------------------------------------
    */

    // READ
    Route::get('/likes', [LikedQuoteController::class, 'index']);          // all
    Route::get('/like/{likedQuote}', [LikedQuoteController::class, 'show']); // single

    // CREATE
    Route::post('/like', [LikedQuoteController::class, 'store']);

    // UPDATE
    Route::put('/like/{likedQuote}', [LikedQuoteController::class, 'update']);

    // DELETE
    Route::delete('/like/{likedQuote}', [LikedQuoteController::class, 'destroy']);
});
