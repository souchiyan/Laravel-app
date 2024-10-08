<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shift extends Model
{
    use HasFactory;

    public function admin()
    {
        return $this->belongsTo(Admin::class);  
    }
    public function worker()
    {
        return $this->belongsTo(Worker::class);  //ここ悩みどころ
    }
}
