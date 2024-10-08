<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Need_Shifts extends Model
{
    use HasFactory;

    public function admin()
    {
        return $this->belongsTo(Admin::class);  //ここ悩みどころ
    }
}
