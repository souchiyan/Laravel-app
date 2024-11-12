import React from "react";

function Table({ attendances }) {
    return (
        <>
            <div>
                <h1>出勤管理</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ユーザー名</th>
                            <th>出勤時刻</th>
                            <th>退勤時刻</th>
                            <th>休憩開始</th>
                            <th>休憩終了</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendances.map((attendance) => (
                            <tr key={attendance.id}>
                                <td>{attendance.user?.name || "不明"}</td>
                                <td>{attendance.start_at || "未打刻"}</td>
                                <td>{attendance.end_at || "未打刻"}</td>

                                {/* 休憩データの表示 */}
                                {attendance.breaks &&
                                attendance.breaks.length > 0 ? (
                                    attendance.breaks.map(
                                        (breakItem, index) => (
                                            <React.Fragment key={index}>
                                                <td>
                                                    {breakItem.start_at ||
                                                        "未打刻"}
                                                </td>
                                                <td>
                                                    {breakItem.end_at ||
                                                        "未打刻"}
                                                </td>
                                            </React.Fragment>
                                        )
                                    )
                                ) : (
                                    <>
                                        <td>未打刻</td>
                                        <td>未打刻</td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <a href="/admin/dashboard">戻る</a>
            </div>
        </>
    );
}

export default Table;
