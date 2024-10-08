<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Memo extends Model
{
    use HasFactory;
    public function cutomer(){

        return $this-> belongsTo(Customer::class);
    }
    public function admin(){

        return $this-> belongsTo(Admin::class);
    }
}
