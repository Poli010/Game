<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trivia_Questions extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "trivia_questions";
    protected $fillable = [
        'questions',
        'answer',
        'difficulty',
        'question_id'
    ];
}
