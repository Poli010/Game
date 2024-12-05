<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guess_Logo extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "guess_logo";
    protected $fillable = [
        'image',
        'answer',
        'question_id'
    ];
}
