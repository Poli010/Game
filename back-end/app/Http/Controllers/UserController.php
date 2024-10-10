<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail; //NEED FOR SENDING EMAIL
use Illuminate\Support\Facades\Hash; //NEED FOR CHECK HASH PASSWORD
use App\Models\User;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\Update;
use App\Http\Requests\Going;
use App\Models\Accounts;
use App\Mail\VerificationCodeMail; 
use App\Mail\ResendCodeMail; 
use App\Mail\Forgot_Password; 

class UserController extends Controller
{   
    // INSERT DATA
    public function sign_up(UserStoreRequest $request){
        try{
          $verificationCode = implode('', array_map(fn() => rand(1, 9), range(1, 6)));
           Accounts::create([
                'email' => $request->email,
                'username' => $request->username,
                'password' => bcrypt($request->password),
                'verification_code' => $verificationCode,
                'verification_complete' => '',
                'user_id' => 'user-ID-' . implode('', array_map(fn() => rand(1, 9), range(1, 6))),
                'account_type' => $request->account_type

             ]);
             Mail::to($request->email)->send(new VerificationCodeMail($verificationCode));
            
             return response()->json([
                 'message' => 'Sign Up Successful'
            ], 200);
        }

        catch(\Exception $e){
            return response()->json([
                'message' => 'Something Went Wrong',
                'error' => $e->getMessage()
            ], 500);
        }
    }  

    //FETCH DATA IF USERNAME AND EMAIL IS AVAILABLE OR NOT
    public function fetch_username($email, $username){
        $username = Accounts::where('username', $username)->first();
        $email = Accounts::where('email', $email)->first();
        if($username && $email){
            return response()->json(['message' => 'Email and Username is already taken'], 200);
        }
        else if($username){
            return response()->json(['message' => 'Username is already taken'], 200);
        }
        else if($email){
            return response()->json(['message' => 'Email is already taken'], 200);
        }
        else{
            return response()->json(['message' => 'Email and Username is Available'], 200);
        }
    }

    //UPDATE VERIFICATION_COMPLETE WHERE EMAIL = TO EMAIL THAT USER ENTER
    public function verification_complete(Update $update, $email){
       $accounts = Accounts::where('email', $email)->first();
       if(!$accounts){
        return response()->json(['message' => 'user not found'], 404);
       }
       else if($accounts->verification_code !== $update->verification_complete){
            return response()->json(['message' => 'Wrong verification code'], 200);
       }
       else{
        $accounts->verification_complete = $update->verification_complete;
        $accounts->save();
        return response()->json(['message' => 'insert success'], 200);
       }
    }

    //RESEND CODE FUNCTION
    public function resend($email){
        $resend = Accounts::where('email', $email)->first();
        if(!$resend){
            return response()->json(['message' => 'user not found'], 404);
        }
        $verificationCode = implode('', array_map(fn() => rand(1, 9), range(1, 6)));
        Mail::to($email)->send(new ResendCodeMail($verificationCode));
        $resend->verification_code = $verificationCode;
        $resend->save();
        return response()->json(['message' => 'resend code success'], 200);        
    }

    //LOGIN FUNCTION
    public function login(Going $going){
        try{
            $email = $going->email;
            $username = $going->username;
            $password = $going->password;
            $email = Accounts::where('email', $email)->orWhere('username', $username)->first();
            
            if(!$email){
                return response()->json(['message' => 'wrong email/username address'], 200);
            }
            else if(!Hash::check($password, $email->password)){
                return response()->json(['message' => 'wrong password'], 200);
            }
            else if($email->account_type === "end_user"){
                return response()->json(['message' => 'going to end user page'], 200);
            }
            else if($email->account_type === "admin"){
                return response()->json(['message' => 'going to admin page'], 200);
            }
        }
        catch(\Exception $e){
            return response()->json([
                'message' => 'Something Went Wrong',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    //FORGOT PASSWORD FUNCTION
    public function forgot_password($email){
        $accounts = Accounts::where('email', $email)->first();
        if(!$accounts){
            return response()->json(['message' => 'the email you entered is not registered to our system'], 200);
        }
        else{
            $verificationCode = implode('', array_map(fn() => rand(1, 9), range(1, 6)));
            Mail::to($email)->send(new Forgot_Password($verificationCode));
            $accounts->verification_code = $verificationCode;
            $accounts->save();
            return response()->json(['message' => 'verification code sent successfully'], 200);
        }

    }
}
