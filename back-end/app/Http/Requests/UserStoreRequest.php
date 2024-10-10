<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        //return false;
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {  
        return[
            'username' => 'required|string|max:258',
            'email' => 'required|string',
            'password' => 'required|string',
            'verification_code' => 'string',
            'verification_complete' => 'string',
            'user_id' => 'string',
            'account_type' => 'required|string'
        ];
    }
   
 
    
    
    

}
