<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendances extends Model
{
    use HasFactory;

    public function worker()
    {
        return $this->belongsTo(Worker::class);  //ここ悩みどころ
    }
    public function breaks()
    {
        return $this->hasMany(Breaks::class);  //ここ悩みどころ
    }

}
