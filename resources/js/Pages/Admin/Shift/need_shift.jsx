import React, { useState, useEffect } from "react";

function NeedShift({ shifts }) {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [userShifts, setUserShifts] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedShifts, setEditedShifts] = useState({});
    const [originalShifts, setOriginalShifts] = useState({});

    const years = Array.from(new Set(shifts.map((shift) => new Date(shift.start_at).getFullYear()))).sort();
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const handleYearChange = (e) => setSelectedYear(Number(e.target.value));
    const handleMonthChange = (e) => setSelectedMonth(Number(e.target.value));

    // 日付を「11/1」形式で表示
    const getAllDatesInMonth = (year, month) => {
        const daysInMonth = new Date(year, month, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => `${month}/${i + 1}`);
    };

    useEffect(() => {
        const filteredShifts = shifts.filter((shift) => {
            const shiftDate = new Date(shift.start_at);
            return shiftDate.getFullYear() === selectedYear && shiftDate.getMonth() + 1 === selectedMonth;
        });

        const newUserShifts = filteredShifts.reduce((acc, shift) => {
            const userName = shift.user.name;
            const date = new Date(shift.start_at);
            const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`; // 「11/1」形式に変更
            if (!acc[userName]) acc[userName] = {};
            acc[userName][formattedDate] = `${formatTime(shift.start_at)} ~ ${formatTime(shift.end_at)}`;
            return acc;
        }, {});

        setUserShifts(newUserShifts);
        setEditedShifts(newUserShifts);
        setOriginalShifts(newUserShifts);
    }, [shifts, selectedYear, selectedMonth]);

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    const dates = getAllDatesInMonth(selectedYear, selectedMonth);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            setUserShifts(editedShifts);
        }
    };

    const handleReset = () => {
        setEditedShifts(originalShifts);
    };

    const handleInputChange = (userName, date, value) => {
        setEditedShifts((prev) => ({
            ...prev,
            [userName]: {
                ...prev[userName],
                [date]: value,
            },
        }));
    };

    return (
        <div>
            <h2>提出されたシフト</h2>
            <a href="/admin/dashboard">戻る</a>

            <div>
                <label>年を選択: </label>
                <select value={selectedYear} onChange={handleYearChange}>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}年
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>月を選択: </label>
                <select value={selectedMonth} onChange={handleMonthChange}>
                    {months.map((month) => (
                        <option key={month} value={month}>
                            {month}月
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={handleEditToggle}>
                {isEditing ? "確定" : "編集"}
            </button>
            {isEditing && (
                <button onClick={handleReset}>
                    提出されたデータに戻す
                </button>
            )}

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>ユーザー名</th>
                        {dates.map((date) => (
                            <th key={date} style={{ border: "1px solid #ccc", padding: "8px" }}>
                                {date}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(userShifts).map(([userName, shifts]) => (
                        <tr key={userName}>
                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{userName}</td>
                            {dates.map((date) => (
                                <td key={date} style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedShifts[userName]?.[date] || ""}
                                            onChange={(e) => handleInputChange(userName, date, e.target.value)}
                                        />
                                    ) : (
                                        shifts[date] || "✕"
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default NeedShift;
