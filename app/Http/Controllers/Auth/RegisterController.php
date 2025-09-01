<?php

namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisterController extends Controller
{
    /**
     * Handle an incoming registration request.
     */
    public function index()
    {
        return inertia('Auth/Register');
    }

    public function showUser()
    {
        return inertia('Auth/Index');
    }
    public function store(Request $request)
    {
        $messages = [
            'required' => ':attribute tidak boleh kosong !',
            'unique'     => ':attribute sudah digunakan, silakan pilih yang lain.',
            'confirmed'  => ':attribute tidak sama dengan konfirmasi.',
        ];
        $attributes = [
            'name'       => 'nama',
            'username'   => 'username',
            'password'   => 'password',
        ];
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:50', 'unique:users'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ],$messages,$attributes);

        User::create([
            'name' => $request->name,
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'level' => 'pelapor',
        ]);

        return redirect('/user')->with('status', 'Register Berhasil!');
    }
}