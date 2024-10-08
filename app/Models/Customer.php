<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    public function admin(){

        return $this-> belongsTo(Admin::class);
    }
    public function memos(){

        return $this-> hasMany(Memo::class);
    }
}
