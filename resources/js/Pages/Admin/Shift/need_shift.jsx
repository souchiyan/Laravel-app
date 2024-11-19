import React, { useState, useEffect } from "react";

function NeedShift({ shifts }) {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(
        new Date().getMonth() + 1
    );
    const [userShifts, setUserShifts] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedShifts, setEditedShifts] = useState({});
    const [originalShifts, setOriginalShifts] = useState({});

    const years = Array.from(
        new Set(shifts.map((shift) => new Date(shift.start_at).getFullYear()))
    ).sort();
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const handleYearChange = (e) => setSelectedYear(Number(e.target.value));
    const handleMonthChange = (e) => setSelectedMonth(Number(e.target.value));

    const getAllDatesInMonth = (year, month) => {
        const daysInMonth = new Date(year, month, 0).getDate();
        return Array.from(
            { length: daysInMonth },
            (_, i) => `${month}/${i + 1}`
        );
    };

    useEffect(() => {
        const filteredShifts = shifts.filter((shift) => {
            const shiftDate = new Date(shift.start_at);
            return (
                shiftDate.getFullYear() === selectedYear &&
                shiftDate.getMonth() + 1 === selectedMonth
            );
        });

        const newUserShifts = filteredShifts.reduce((acc, shift) => {
            const userName = shift.user.name;
            const date = new Date(shift.start_at);
            const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
            if (!acc[userName]) acc[userName] = {};
            acc[userName][formattedDate] = `${formatTime(
                shift.start_at
            )} ~ ${formatTime(shift.end_at)}`;
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
        <>
            <div className=" bg-gray-600 flex flex-row items-center justify-between py-6 px-4 md:px-8 mb-10 flex-nowrap">
                <div>
                    <a
                        href="/admin/dashboard"
                        className="text-white border border-gray-300 rounded-lg px-6 py-2 hover:bg-gray-400 transition"
                    >
                        戻る
                    </a>
                </div>
                <h2 className="font-bold text-white text-center text-2xl">
                    提出されたシフト
                </h2>
            </div>

            <div className="flex gap-6 mb-6">
                <div className="flex-1">
                    <label className="block font-medium mb-2">年を選択:</label>
                    <select
                        value={selectedYear}
                        onChange={handleYearChange}
                        className="w-full p-3 border rounded-lg bg-gray-50"
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}年
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex-1">
                    <label className="block font-medium mb-2">月を選択:</label>
                    <select
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        className="w-full p-3 border rounded-lg bg-gray-50"
                    >
                        {months.map((month) => (
                            <option key={month} value={month}>
                                {month}月
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mb-6">
                <button
                    onClick={handleEditToggle}
                    className="px-6 py-3 text-lg text-white bg-blue-600 rounded-lg mr-3 hover:bg-blue-700 transition"
                >
                    {isEditing ? "確定" : "編集"}
                </button>
                {isEditing && (
                    <button
                        onClick={handleReset}
                        className="px-6 py-3 text-lg text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition"
                    >
                        提出されたデータに戻す
                    </button>
                )}
            </div>

            <div className="table-wrapper overflow-x-auto whitespace-nowrap">
                <table className="w-full table-auto mt-6 border-collapse">
                    <thead className="bg-gray-100 sticky top-0 z-10">
                        <tr>
                            <th className="p-4 text-center font-bold text-gray-700 border-b">
                                ユーザー名
                            </th>
                            {dates.map((date) => (
                                <th
                                    key={date}
                                    className="p-4 text-center font-bold text-gray-700 border-b"
                                >
                                    {date}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(userShifts).map(
                            ([userName, shifts]) => (
                                <tr key={userName}>
                                    <td className="p-4 text-center border-b">
                                        {userName}
                                    </td>
                                    {dates.map((date) => (
                                        <td
                                            key={date}
                                            className="p-4 text-center border-b"
                                        >
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={
                                                        editedShifts[
                                                            userName
                                                        ]?.[date] || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            userName,
                                                            date,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="rounded-lg font-medium"
                                                />
                                            ) : (
                                                shifts[date] || "✕"
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default NeedShift;
