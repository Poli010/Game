<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//CHEAT CODE
// Route::get('users', [UserController::class,'index']);
// Route::get('users/{email}', [UserController::class, 'show']);
// Route::post('addnew', [UserController::class, 'insert']);
// Route::put('userupdate/{id}', [UserController::class, 'update']);
// Route::delete('delete/{id}', [UserController::class, 'destroy']);

Route::post('signUp', [UserController::class, 'sign_up']);
Route::get('user/{email}/{username}', [UserController::class, 'fetch_username']);
Route::post('updateVerification/{email}', [UserController::class, 'verification_complete']);
Route::put('resendCode/{email}', [UserController::class, 'resend']);
Route::post('loginPage', [UserController::class, 'login']);
Route::post('forgot_password/{email}', [UserController::class, 'forgot_password']);
Route::put('updatePassword/{email}', [UserController::class, 'newPassword']);
Route::get('fetch', [UserController::class, 'fetchAll']);


