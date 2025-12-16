<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\QuoteController;
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
    Route::post('/like', [LikedQuoteController::class, 'store']);
    Route::delete('/like/{likedQuote}', [LikedQuoteController::class, 'destroy']);
});
