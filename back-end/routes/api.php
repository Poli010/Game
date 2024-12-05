<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;

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

//ADMIN PAGE API
Route::post("create_account", [AdminController::class, 'create_account']);
Route::put("edit_account/{id}", [AdminController::class, 'editAccount']);
Route::delete("delete_account/{user_id}", [AdminController::class, 'delete_account']);

//TRIVIA QUESTION PAGE API
Route::get("fetch_question", [AdminController::class, 'trivia_questions']);
Route::post("add_questions", [AdminController::class, 'addQuestions']);
Route::put('updateQuestion/{id}', [AdminController::class, 'editQuestion']);
Route::delete('deleteQuestion/{question_id}', [AdminController::class, 'deleteQuestion']);

//GUESS THE LOGO API
Route::get('fetch_guessLogo', [AdminController::class, 'fetchGuess']);
Route::post('addGuessQuestion', [AdminController::class, 'addGuessLogo']);
Route::post('editGuessQuestion/{question_id}', [AdminController::class, 'editGuess']); //USE POST, NOT PUT. BECAUSE YOUR CREATING NEW IMAGE AND NOT UPDATING OKAY!, YOU ONLY UPDATE THE ANSWER WHICH IS STRING, BUT IMAGE IS NOT EDITABLE SO YOU NEED TO CREATE NEW THAT'S WHY YOU NEED TO USE POST!
Route::delete('deleteGuessQuestion/{question_id}', [AdminController::class, 'deleteGuess']);