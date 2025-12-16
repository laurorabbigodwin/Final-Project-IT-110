<?php

use App\Http\Controllers\QuoteController;
use App\Http\Controllers\LikedQuoteController;
use Illuminate\Support\Facades\Route;

Route::get('/', [QuoteController::class, 'index'])->name('home');

Route::middleware(['auth'])->group(function () {
    Route::post('/like', [LikedQuoteController::class, 'store'])->name('like.store');
    Route::delete('/like/{likedQuote}', [LikedQuoteController::class, 'destroy'])->name('like.destroy');
});

require __DIR__.'/auth.php';
