<?php

namespace App\Http\Controllers;

use App\Models\LikedQuote;
use Illuminate\Http\Request;

class LikedQuoteController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'quote' => 'required|string',
        ]);

        auth()->user()->likedQuotes()->firstOrCreate([
            'quote' => $request->quote,
        ]);

        return back();
    }

    public function destroy(LikedQuote $likedQuote)
    {
        // Authorization safety check
        if ($likedQuote->user_id !== auth()->id()) {
            abort(403);
        }

        $likedQuote->delete();
        return back();
    }
}
