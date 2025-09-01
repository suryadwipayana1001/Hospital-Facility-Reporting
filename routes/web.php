<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// initial route
Route::redirect('/', '/login');

//route index login
Route::get('/login', [\App\Http\Controllers\Auth\LoginController::class, 'index']);
Route::post('/login', [\App\Http\Controllers\Auth\LoginController::class, 'store']);
//middleware auth and user role

//middlware auth
Route::middleware(['auth', 'role:teknisi'])->group(function () {
    //route index register
    Route::get('/register', [\App\Http\Controllers\Auth\RegisterController::class, 'index']);
    Route::post('/register', [\App\Http\Controllers\Auth\RegisterController::class, 'store']);
    //route user
    Route::resource('/user', \App\Http\Controllers\Auth\UserController::class);
    // route report file
    Route::get('/reports-file', [\App\Http\Controllers\Report\ReportController::class, 'report'])->name('reports.report');
    Route::get('/reports-file/export', [\App\Http\Controllers\Report\ReportController::class, 'exportPdf'])->name('reports.export');
});
Route::middleware('auth')->group(function () {
    //route dashboard
    Route::match(['get','post'], '/dashboard', [\App\Http\Controllers\Dashboard\DashboardController::class, 'index'])->name('dashboard');
    //route report
    Route::resource('reports',\App\Http\Controllers\Report\ReportController::class);
    //route logout
    Route::post('/logout', [\App\Http\Controllers\Auth\LoginController::class, 'destroy']);
});
