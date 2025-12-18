<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LikedQuote;
use Illuminate\Http\Request;

class LikedQuoteController extends Controller
{
    /**
     * READ — display all liked quotes of the authenticated user
     */
    public function index()
    {
        return auth()->user()->likedQuotes()->latest()->get();
    }

    /**
     * CREATE — like a quote
     */
    public function store(Request $request)
    {
        $request->validate([
            'quote' => 'required|string',
        ]);

        $likedQuote = auth()->user()->likedQuotes()->firstOrCreate([
            'quote' => $request->quote,
        ]);

        return response()->json($likedQuote, 201);
    }

    /**
     * READ — display a single liked quote
     */
    public function show(LikedQuote $likedQuote)
    {
        abort_if($likedQuote->user_id !== auth()->id(), 403);

        return response()->json($likedQuote);
    }

    /**
     * UPDATE — update a liked quote (if allowed by your system)
     */
    public function update(Request $request, LikedQuote $likedQuote)
    {
        abort_if($likedQuote->user_id !== auth()->id(), 403);

        $request->validate([
            'quote' => 'required|string',
        ]);

        $likedQuote->update([
            'quote' => $request->quote,
        ]);

        return back()->with('success', 'Saved');
    }


    /**
     * DELETE — unlike a quote
     */
    public function destroy(LikedQuote $likedQuote)
    {
        abort_if($likedQuote->user_id !== auth()->id(), 403);

        $likedQuote->delete();

        return response()->json(null, 204);
    }
}
