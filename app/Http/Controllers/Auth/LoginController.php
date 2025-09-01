<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function index()
    {
        return inertia('Auth/Login');
    }

    public function store(Request $request)
    {
        // validasi pakai username
        $messages = [
            'required' => ':attribute tidak boleh kosong !',
        ];

        $this->validate($request, [
            'username' => 'required|string',
            'password' => 'required|string',
        ], $messages);

        // ambil username dan password
        $credentials = $request->only('username', 'password');

        // attempt login pakai username
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect('/dashboard');
        }

        return back()->withErrors([
            'username' => 'Login gagal, username atau password salah',
        ]);
    }

    public function destroy()
    {
        auth()->logout();

        return redirect('/login');
    }
}
