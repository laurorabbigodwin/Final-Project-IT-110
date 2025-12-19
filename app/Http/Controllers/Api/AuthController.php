<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try{
        $validated = $request->validate([
            'username' => 'required|string|max:255|unique:users,username',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'username' => $validated['username'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        Auth::login($user);
        }catch(\Exception $e){
            return back()->withErrors([
                'username' => 'An error occurred during registration. Please try again.',
            ]);
        }

    }

    public function login(Request $request)
    {
        try{
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required',
        ]);

        $user = User::where('username', $credentials['username'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return back()->withErrors([
                'username' => 'username or password is incorrect.',
            ]);
        }

        Auth::login($user);
        $request->session()->regenerate();

        }catch(\Exception $e){
            return back()->withErrors([
                'username' => 'An error occurred during login. Please try again.',
            ]);
        }
    }

    public function logout(Request $request)
    {
        try{
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        }catch(\Exception $e){
            return back()->withErrors([
                'logout' => 'An error occurred during logout. Please try again.',
            ]);
        }
    }
}
