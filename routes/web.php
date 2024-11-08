<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Submit_ShiftController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\Need_ShiftController;
use App\Http\Controllers\ShiftController;
use App\Models\Need_Shifts;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// シフト管理用ーーーーーーーーーーーーーーーーーーーーーーーー
Route::get('/', function () {
    return Inertia::render('Index');
});
Route::get('/submit', [Submit_ShiftController::class, 'index']);

Route::get('/shift', [Submit_ShiftController::class, 'shift']);
Route::get('/shift/create', [Submit_ShiftController::class, 'create']);

Route::post('/shift', [Submit_ShiftController::class, 'store']);
Route::get('/need', [Submit_ShiftController::class, 'getShifts']);

Route::get('/submit_complete', function () {

    return Inertia::render('Shift/submit_complete');
});




// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

//出退勤用ーーーーーーーーーーーーーーーーーーーーーーーーーーーー

Route::get('/attendances', [AttendanceController::class, 'index'])->name('attendance.index');
Route::get('/table', [AttendanceController::class, 'getAttendance'])->name('admin.index');

Route::post('/attendances', [AttendanceController::class, 'store'])->name('attendance.store');








//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route::middleware('admin')->group(function () {  かもしれない。
Route::prefix('admin')->namespace('Admin')->middleware('auth:is_admin')->group(function () {
    Route::get('/admin', 'Auth\LoginController@showLoginForm')->name('admin.login');
    Route::post('/admin', 'Auth\LoginController@login');
    Route::post('/admin', 'Auth\LoginController@logout')->name('admin.logout');

    Route::get('/', 'DashboardController@index')->name('admin.dashboard');
});

require __DIR__ . '/auth.php';
