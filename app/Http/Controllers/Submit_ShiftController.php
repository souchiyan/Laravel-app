<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Submit_Shifts;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

use App\Models\User;

class Submit_ShiftController extends Controller
{
    public function index()
    {
        return Inertia::render("Shift/submit_shift");

    }
    public function shift()
    {
        return Inertia::render("Shift/shift");

    }
    public function create(Request $request)
    {
        $input = $request->all();
        $year = $input['year'];
        $month = $input['month'];
        $date = 1;

        $carbon = Carbon::createFromDate($year, $month, $date);
        // 月初を取得
        $startOfMonth = $carbon->startOfMonth()->toDateString();
        // 月末を取得
        $endOfMonth = $carbon->endOfMonth()->toDateString();
        // 月初～月末の期間を取得
        $periods = CarbonPeriod::create($startOfMonth, $endOfMonth)->toArray();

        $array = [];

        $length = count($periods);

        for ($i = 0; $i < $length; $i++) {
            array_push($array, $i + 1);
        }

        return Inertia::render('Shift/submit', ['periods' => $periods, 'dates' => $array, 'year' => $year, 'month' => $month]);


    }

    public function store(Request $request, Submit_Shifts $submit_shift)
    {
        $input = $request->all();

        $formattedData = array_map(function ($item) use ($input) {
            $startDateTime = null;
            $endDateTime = null;

            // start_atがnullでない場合のみdatetime変換
            if ($item['start_at'] !== null) {
                $startDateTime = Carbon::createFromFormat(
                    'Y-m-d H:i',
                    "{$input['year']}-{$input['month']}-{$item['date']} {$item['start_at']}"
                );
            }

            // end_atがnullでない場合のみdatetime変換
            if ($item['end_at'] !== null) {
                $endDateTime = Carbon::createFromFormat(
                    'Y-m-d H:i',
                    "{$input['year']}-{$input['month']}-{$item['date']} {$item['end_at']}"
                );
            }

            return [
                'start_at' => $startDateTime,
                'end_at' => $endDateTime,
                // 'year' => $input['year'],
                // 'month' => $input['month'],
                // 'date' => $item['date'],
                'user_id' => Auth::id(),
            ];
        }, $input['data']);


        foreach ($formattedData as $data) {
            Submit_Shifts::create($data);
        }

        return redirect('/submit_complete');
    }
    public function getShifts()
    {
        $shifts = Submit_Shifts::with('user:id,name')->get();

        return Inertia::render('Admin/Shift/need_shift', ['shifts' => $shifts]);
    }

    public function welcome()
    {
        $shifts = Submit_Shifts::with('user')->get();
        return Inertia::render('Welcome', ['shifts' => $shifts]);
    }

}






