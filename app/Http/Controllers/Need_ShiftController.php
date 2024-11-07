<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class Need_ShiftController extends Controller
{
    public function index()
    {
        return Inertia::render("Shift/need_shift");
        
    }
}
