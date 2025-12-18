<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class QuoteController extends Controller
{
    // /**
    //  * Render the single-page Home experience
    //  */
    // public function index()
    // {
    //     // Fetch affirmation from external API
    //     try {
    //         $response = Http::timeout(5)->get('https://www.affirmations.dev/');
    //         $quote = $response->json('affirmation');
    //     } catch (\Exception $e) {
    //         $quote = 'You are enough just as you are.';
    //     }

    //     // Render the ONLY Inertia page
    //     return Inertia::render('Home', [
    //         'quote' => $quote,
    //         'likedQuotes' => auth()->check()
    //             ? auth()->user()
    //                 ->likedQuotes()
    //                 ->latest()
    //                 ->get()
    //             : [],
    //     ]);
    // }
}
