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
        try{
        return auth()->user()->likedQuotes()->latest()->get();
        }catch(\Exception $e){
            return response()->json(['error' => 'Could not retrieve liked quotes. Please try again.'], 500);
        }
    }

    /**
     * CREATE — like a quote
     */
    public function store(Request $request)
    {
        try{
            $request->validate([
                'quote' => 'required|string',
            ]);

            auth()->user()->likedQuotes()->firstOrCreate([
                'quote' => $request->quote,
            ]);
        }catch(\Exception $e){
            return response()->json(['error' => 'Could not like the quote. Please try again.'], 500);
        }
    }

    /**
     * READ — display a single liked quote
     */
    public function show(LikedQuote $likedQuote)
    {
        try{
        abort_if($likedQuote->user_id !== auth()->id(), 403);

        return response()->json($likedQuote);
        }catch(\Exception $e){
            return response()->json(['error' => 'Could not retrieve the liked quote. Please try again.'], 500);
        }
    }

    /**
     * UPDATE — update a liked quote (if allowed by your system)
     */
    public function update(Request $request, LikedQuote $likedQuote)
    {
        try{
            abort_if($likedQuote->user_id !== auth()->id(), 403);

            $request->validate([
                'quote' => 'required|string',
            ]);

            $likedQuote->update([
                'quote' => $request->quote,
            ]);

            return back()->with('success', 'Saved');

        }catch(\Exception $e){
            return response()->json(['error' => 'Could not update the liked quote. Please try again.'], 500);
        }
    }


    /**
     * DELETE — unlike a quote
     */
    public function destroy(LikedQuote $likedQuote)
    {
        try{
            abort_if($likedQuote->user_id !== auth()->id(), 403);

            $likedQuote->delete();

            return redirect('/');

        }catch(\Exception $e){
            return response()->json(['error' => 'Could not unlike the quote. Please try again.'], 500);
        }
    }
}
