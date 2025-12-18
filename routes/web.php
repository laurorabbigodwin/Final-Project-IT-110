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
Route::get('/', function () {
    $response = Http::get('https://zenquotes.io/api/quotes');

    $quote = 'You are enough.';

    if ($response->successful()) {
        $quotes = $response->json();

        if (is_array($quotes) && count($quotes) > 0) {
            $random = collect($quotes)->random();
            $quote = "{$random['q']} — {$random['a']}";
        }
    }

    return Inertia::render('Home', [
        'quote' => $quote,

        // READ (all liked quotes)
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
