<?php

namespace App\Http\Controllers;

use App\Models\Attendances;
use App\Models\Breaks;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function index()
    {

        // 取得したデータをInertiaに渡す
        return Inertia::render('Attendance/attendance');
    }

    // public function store(Request $request)
    // {
    //     $input = $request->all();

    //     // 出勤または退勤データを登録
    //     $attendance = Attendances::updateOrCreate(
    //         ['user_id' => auth()->id()],
    //         $input
    //     );

    //     // 休憩データの登録
    //     if (isset($input['break_start_at']) || isset($input['break_end_at'])) {
    //         $break = new Breaks();
    //         $break->attendances_id = $attendance->id; // 関連付け
    //         $break->start_at = $input['break_start_at'] ?? null;
    //         $break->end_at = $input['break_end_at'] ?? null;
    //         $break->save();
    //     }

    //     return redirect()->route('attendance.index');
    // }

    public function store(Request $request)
    {
        $input = $request->all();

        // 出勤または退勤データを登録
        $attendance = Attendances::updateOrCreate(
            ['user_id' => auth()->id()],
            $input
        );

        // 休憩データの登録
        if (isset($input['break_start_at']) || isset($input['break_end_at'])) {
            $break = new Breaks();
            $break->attendances_id = $attendance->id; // 関連付け
            $break->start_at = $input['break_start_at'] ?? null;
            $break->end_at = $input['break_end_at'] ?? null;
            $break->save();
        }

        // リダイレクト時に最新のデータを渡す
        return Inertia::render('Attendance/attendance', [
            'attendance' => $attendance
        ]);
    }



    public function getAttendance()
    {
        //with()を使ってattendanceに紐づいたbreaksも取得
        $attendances = Attendances::with('breaks', 'user')->get();

        // Inertiaでデータを渡す
        return Inertia::render('Admin/Attendance/Table', [
            'attendances' => $attendances,
        ]);
    }



}