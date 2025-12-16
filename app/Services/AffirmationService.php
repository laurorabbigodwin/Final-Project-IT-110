<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class AffirmationService
{
    public function getQuote(): string
    {
        return Cache::remember('affirmation_quote', 30, function () {
            $response = Http::get('https://www.affirmations.dev/');

            if ($response->failed()) {
                return "You are enough.";
            }

            return $response->json('affirmation');
        });
    }
}
