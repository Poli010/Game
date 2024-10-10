<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accounts extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'accounts';
    protected $fillable = [
        'email',
        'username',
        'password',
        'verification_code',
        'verification_complete',
        'user_id',
        'account_type'
    ];

    // protected $hidden = [
    //     'password',
    // ];
}
