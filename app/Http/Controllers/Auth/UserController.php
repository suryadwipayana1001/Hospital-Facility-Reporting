<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
          //get all user
          $users = User::latest()->get();

          //return view
          return inertia('Auth/Index', [
              'users' => $users
          ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = User::findOrFail($id);
        return inertia('Auth/Edit', ['user' => $user]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        /**
         * validate request
         */
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
            'username' => ['required', 'string', 'max:50', 'unique:users,username,' . $id],
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
            'level' => ['required', 'string']
        ], $messages,$attributes);

        /**
         * update user
         */
        $user = User::findOrFail($id);
        $user->update([
            'name' => $request->name,
            'username' => $request->username,
            'password' => $request->password ? Hash::make($request->password) : $user->password,
            'level' => $request->level,
        ]);

        //redirect
        return redirect()->route('user.index')->with('success', 'User updated successfully!');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
         $user->delete();
         return redirect()->route('user.index')->with('success', 'Data Berhasil Dihapus!');
    }
}
