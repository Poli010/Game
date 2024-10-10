<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

use Illuminate\Support\Facades\Mail;

// Route::get('/test-email', function () {
//     try {
//         Mail::raw('This is a test email', function ($message) {
//             $message->to('ivanpolicarpio015@gmail.com')
//                     ->subject('Test Email');
//         });
//         return 'Email sent successfully';
//     } catch (\Exception $e) {
//         return 'Failed to send email: ' . $e->getMessage();
//     }
// });

