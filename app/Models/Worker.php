<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Worker extends Model
{
    use HasFactory;

    public function shifts()
    {
        return $this->hasMany(Shift::class);  
    }
    public function submit_shift()
    {
        return $this->belongsTo(Submit_Shifts::class);  
    }
    public function attendances()
    {
        return $this->hasMany(Attendances::class);  
    }
}
