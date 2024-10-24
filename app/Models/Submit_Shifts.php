<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Submit_Shifts extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);  //ここ悩みどころ
    }
}
