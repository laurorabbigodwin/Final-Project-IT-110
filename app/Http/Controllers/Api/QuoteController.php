<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AffirmationService;
use Inertia\Inertia;

class QuoteController extends Controller
{
    public function index(AffirmationService $service)
    {
        return Inertia::render('Home', [
            'quote' => $service->getQuote(),
            'likedQuotes' => auth()->check()
                ? auth()->user()->likedQuotes()->latest()->get()
                : [],
        ]);
    }
}
