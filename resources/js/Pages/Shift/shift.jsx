import React, { useState } from "react";

function Shift() {
    const startYear = 2023; // 選択可能な開始年
    const endYear = 2030; // 選択可能な終了年

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
        <>
            <div>
                <h1>シフト管理</h1>
                <form onSubmit={handleSubmit}>
                    {/* 年の選択 */}
                    <label>
                        年:
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </label>

                    {/* 月の選択 */}
                    <label>
                        月:
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        >
                            {months.map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                    </label>

                    <button type="submit">選択</button>
                </form>

                <a href="/dashboard">戻る</a>
            </div>
        </>
    );
}

export default Shift;
