import React, { useState, useEffect } from "react";

function Table({ attendances }) {
    // 現在の年、月、日を取得
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDate = new Date().getDate();

    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedDay, setSelectedDay] = useState(currentDate);

    // 年、月、日の選択肢を生成
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i); // 直近10年分
    const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1～12月

    // 月の最大日数を動的に取得
    const getDaysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    };

    const [daysInMonth, setDaysInMonth] = useState(
        getDaysInMonth(selectedYear, selectedMonth)
    );

    useEffect(() => {
        // 月や年を変更した場合、選択可能な日数を更新
        setDaysInMonth(getDaysInMonth(selectedYear, selectedMonth));
        setSelectedDay(1); // 月を変更したら日付を1日にリセット
    }, [selectedYear, selectedMonth]);

    const handleYearChange = (e) => {
        setSelectedYear(Number(e.target.value));
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(Number(e.target.value));
    };

    const handleDayChange = (e) => {
        setSelectedDay(Number(e.target.value));
    };

    // 選択された日付をフィルタリング
    const filteredAttendances = attendances.filter((attendance) => {
        const attendanceDate = new Date(attendance.start_at);
        return (
            attendanceDate.getFullYear() === selectedYear &&
            attendanceDate.getMonth() + 1 === selectedMonth &&
            attendanceDate.getDate() === selectedDay
        );
    });

    return (
        <>
            <div className="bg-gray-600 flex flex-row items-center justify-between py-6 px-4 md:px-8 mb-10 flex-nowrap rounded-lg shadow-lg">
                <div>
                    <a
                        href="/admin/dashboard"
                        className="text-white border border-gray-300 rounded-lg px-6 py-2 hover:bg-gray-400 transition"
                    >
                        戻る
                    </a>
                </div>
                <h2 className="font-bold text-white text-center text-2xl">
                    出勤管理
                </h2>
            </div>

            {/* 年月日の選択 */}
            <div className="flex items-center justify-start mb-6 space-x-6">
                {/* 年 */}
                <div className="flex flex-col">
                    <label
                        htmlFor="year"
                        className="text-lg text-gray-700 mb-2"
                    >
                        年
                    </label>
                    <select
                        id="year"
                        value={selectedYear}
                        onChange={handleYearChange}
                        className="px-7 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 月 */}
                <div className="flex flex-col">
                    <label
                        htmlFor="month"
                        className="text-lg text-gray-700 mb-2"
                    >
                        月
                    </label>
                    <select
                        id="month"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        className="px-6 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {months.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 日 */}
                <div className="flex flex-col">
                    <label htmlFor="day" className="text-lg text-gray-700 mb-2">
                        日
                    </label>
                    <select
                        id="day"
                        value={selectedDay}
                        onChange={handleDayChange}
                        className="px-6 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {Array.from(
                            { length: daysInMonth },
                            (_, i) => i + 1
                        ).map((day) => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* テーブル */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-6 text-left font-semibold text-gray-700">
                                ユーザー名
                            </th>
                            <th className="py-3 px-6 text-left font-semibold text-gray-700">
                                出勤時刻
                            </th>
                            <th className="py-3 px-6 text-left font-semibold text-gray-700">
                                退勤時刻
                            </th>
                            <th className="py-3 px-6 text-left font-semibold text-gray-700">
                                休憩開始
                            </th>
                            <th className="py-3 px-6 text-left font-semibold text-gray-700">
                                休憩終了
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAttendances.map((attendance) => (
                            <tr
                                key={attendance.id}
                                className="hover:bg-gray-50"
                            >
                                <td className="py-3 px-6">
                                    {attendance.user?.name || "不明"}
                                </td>
                                <td className="py-3 px-6">
                                    {attendance.start_at || "未打刻"}
                                </td>
                                <td className="py-3 px-6">
                                    {attendance.end_at || "未打刻"}
                                </td>

                                {/* 休憩データの表示 */}
                                {attendance.breaks &&
                                attendance.breaks.length > 0 ? (
                                    attendance.breaks.map(
                                        (breakItem, index) => (
                                            <React.Fragment key={index}>
                                                <td className="py-3 px-6">
                                                    {breakItem.start_at ||
                                                        "未打刻"}
                                                </td>
                                                <td className="py-3 px-6">
                                                    {breakItem.end_at ||
                                                        "未打刻"}
                                                </td>
                                            </React.Fragment>
                                        )
                                    )
                                ) : (
                                    <>
                                        <td className="py-3 px-6">未打刻</td>
                                        <td className="py-3 px-6">未打刻</td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Table;
