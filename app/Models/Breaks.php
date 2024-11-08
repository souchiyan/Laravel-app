<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Breaks extends Model
{
    use HasFactory;
    protected $fillable = [
        'attendances_id',
        'start_at',
        'end_at'
    ];

    public function attendance()
    {

        return $this->belongsTo(Attendances::class);
    }

}
