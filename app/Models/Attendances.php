<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendances extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'start_at',
        'end_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);  //ここ悩みどころ
    }
    public function breaks()
    {
        return $this->hasMany(Breaks::class);  //ここ悩みどころ
    }

}
