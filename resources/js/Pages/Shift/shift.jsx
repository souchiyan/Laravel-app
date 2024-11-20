import React, { useState } from "react";

function Shift() {
    const startYear = 2024; // 選択可能な開始年
    const endYear = 2060; // 選択可能な終了年

    // 初期状態の年と月を設定
    const [selectedYear, setSelectedYear] = useState(startYear);
    const [selectedMonth, setSelectedMonth] = useState(1);

    // 年の範囲を作成
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
        years.push(year);
    }

    // 月の範囲を作成
    
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    // フォーム送信時に指定のURLへ遷移
    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = `/shift/create?year=${selectedYear}&month=${selectedMonth}`;
    };

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center px-4">
            {/* ヘッダー */}
            <h1 className="text-3xl font-bold text-gray-700 mb-8">
                シフト提出
            </h1>

            {/* フォーム */}
            <form
                onSubmit={handleSubmit}
                className="bg-gray-50 shadow-md rounded-lg p-6 w-full max-w-md space-y-6"
            >
                {/* 年の選択 */}
                <div className="flex flex-col">
                    <label
                        htmlFor="year"
                        className="text-lg font-medium text-gray-600"
                    >
                        年
                    </label>
                    <select
                        id="year"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="mt-2 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 月の選択 */}
                <div className="flex flex-col">
                    <label
                        htmlFor="month"
                        className="text-lg font-medium text-gray-600"
                    >
                        月
                    </label>
                    <select
                        id="month"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="mt-2 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                    >
                        {months.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 送信ボタン */}
                <button
                    type="submit"
                    className="w-full bg-gray-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-700 transition"
                >
                    選択
                </button>
            </form>

            {/* 戻るリンク */}
            <a
                href="/dashboard"
                className="mt-6 text-gray-500 hover:text-gray-700 text-lg"
            >
                戻る
            </a>
        </div>
    );
}

export default Shift;
