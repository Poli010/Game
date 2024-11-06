<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Accounts;
use  App\Models\Trivia_Questions;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\EditAdminAccount;
use App\Http\Requests\TriviaQuestions;

class AdminController extends Controller
{   
    //FUNCTION FOR ADD NEW ACCOUNT
    public function create_account(UserStoreRequest $request){
        $email = $request->email;
        $username = $request->username;
        $check = Accounts::where('email', $email)->orWhere('username', $username)->first();
        if(!$check){
            $verificationCode = implode('', array_map(fn() => rand(1, 9), range(1, 6)));
            $accounts = Accounts::create([
                "email" => $request->email,
                "username" => $request->username,
                "password" => bcrypt($request->password),
                "verification_code" => $verificationCode,
                "verification_complete" => $verificationCode,
                'user_id' => 'user-ID-' . implode('', array_map(fn() => rand(1, 9), range(1, 6))),
                "account_type" => $request->account_type
            ]);
            return response()->json(['message' => 'Create Success'], 200);
        }
        else if($check->email === $email){
            return response()->json(['message' => 'email is already taken'], 200);
        }
        else if($check->username === $username){
            return response()->json(['message' => 'username is already taken'], 200);
        }
    }
    
    //FUNCTION FOR EDIT ACCOUNT
    public function editAccount(EditAdminAccount $admin, $id){
        $email = $admin->email;
        $username = $admin->username;
        $account_type = $admin->account_type;
        $edit = Accounts::where('id', $id)->first();
        $check_email = Accounts::where('email', $email)->first();
        $check_username = Accounts::where('username', $username)->first();
        if($edit){
            if($check_email){
                return response()->json(['message' => 'email is already taken'], 200);
            }
            else if($check_username){
                return response()->json(['message' => 'username is already taken'], 200);
            }
            else{
                $edit->email = $email;
                $edit->username =$username;
                $edit->account_type =$account_type;
                $edit->save();
                return response()->json(['message' => 'update success'], 200);
            }
        }
        else{
            return response()->json(['message' => 'user not found!'], 404);
        }
    
        
    }

    public function delete_account($user_id){
        $delete = Accounts::where('user_id', $user_id)->first();
        if($delete){
            $delete->delete();
            return response()->json(['message' => 'Delete success'], 200);
        }
        else{
            return response()->json(['message' => 'account not found'], 404);
        }
    }

    //FUNCTION FOR Fetching Questions
    public function trivia_questions(){
        $fetch = Trivia_Questions::all();
        return response()->json(['result' => $fetch], 200);
    }

    //FUNCTION FOR ADDING QUESTIONS
    public function addQuestions(TriviaQuestions $trivia){
        $question = $trivia->questions;
        $answer = $trivia->answer;
        $difficulty = $trivia->difficulty;
        $check = Trivia_Questions::where('questions', $question)->first();
        if($check){
            return response()->json(['message' => "Question is already inserted"], 200);
        }
        else{
            $add = Trivia_Questions::create([
                "questions" => $question,
                "answer" => $answer,
                "difficulty" => $difficulty,
                "question_id" => "QuestionID-" .implode('', array_map(fn() => rand(1, 9), range(1, 6)))
            ]);
            return response()->json(['message' => "Question Added Successfully"], 200);
        }
    }

    //UPDATE QUESTIONS
    public function editQuestion(TriviaQuestions $trivia, $id){
        $question = $trivia->questions;
        $answer = $trivia->answer;
        $difficulty = $trivia->difficulty;
        $edit_question = Trivia_Questions::where('id', $id)->first();
        $check_question = Trivia_Questions::where('questions', $question)->first();
        if($edit_question){
            if($check_question){
                return response()->json(['message' => 'This question is already exist'], 200);
            }
            else{
                $edit_question->questions = $question;
                $edit_question->answer = $answer;
                $edit_question->difficulty = $difficulty;
                $edit_question->save();
    
                return response()->json(['message' => 'edit success'], 200);
            } 
        }
        else{
            return response()->json(['message' => 'question not found '], 404);
        }
        
    }

    //DELTE QUESTIONS
    public function deleteQuestion($question_id){
        $delete = Trivia_Questions::where('question_id', $question_id)->first();
        if($delete){
            $delete->delete();
            return response()->json(['message' => 'delete success'], 200);
        }
        else{
            return response()->json(['message' => 'user not found!'], 200);
        }
    }
}