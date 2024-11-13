import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

function Attendance() {
    const { data, setData, post } = useForm({
        start_at: "",
        end_at: "",
        break_start_at: "",
        break_end_at: "",
    });
    const [onBreak, setOnBreak] = useState(false);
    const [clockInTime, setClockInTime] = useState(null);
    const [clockOutTime, setClockOutTime] = useState(null);
    const [breakStartTime, setBreakStartTime] = useState(null);
    const [breakEndTime, setBreakEndTime] = useState(null);

    // モーダル表示制御のための状態
    const [modalMessage, setModalMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    const handleClockIn = () => {
        const time = getCurrentTime();
        setClockInTime(time);
        setData("start_at", time);
        showModalWithMessage(`${time} - 出勤しました`);
    };

    const handleClockOut = () => {
        const time = getCurrentTime();
        setClockOutTime(time);
        setData("end_at", time);
        showModalWithMessage(`${time} - 退勤しました`);
    };

    const handleBreakStart = () => {
        const time = getCurrentTime();
        setBreakStartTime(time);
        setOnBreak(true);
        setData("break_start_at", time);
        showModalWithMessage(`${time} - 休憩を開始しました`);
    };

    const handleBreakEnd = () => {
        const time = getCurrentTime();
        setBreakEndTime(time);
        setOnBreak(false);
        setData("break_end_at", time);
        showModalWithMessage(`${time} - 休憩を終了しました`);
    };

    const handleSendPosts = (e) => {
        e.preventDefault();
        post("/attendances");
    };

    // モーダル表示
    const showModalWithMessage = (message) => {
        setModalMessage(message);
        setShowModal(true);
        setTimeout(() => setShowModal(false), 4000); // 3秒後にモーダルを自動的に閉じる
    };

    return (
        <div>
            <h1>Attendance管理</h1>

            {/* <div>
                <p>出勤時刻: {clockInTime || "未打刻"}</p>
                <p>退勤時刻: {clockOutTime || "未打刻"}</p>
                <p>休憩開始時刻: {breakStartTime || "未打刻"}</p>
                <p>休憩終了時刻: {breakEndTime || "未打刻"}</p>
            </div> */}

            {showModal && (
                <div className="modal">
                    <p>{modalMessage}</p>
                </div>
            )}

            <form onSubmit={handleSendPosts}>
                <input type="hidden" value={data.start_at} />
                <input type="hidden" value={data.end_at} />
                <input type="hidden" value={data.break_start_at} />
                <input type="hidden" value={data.break_end_at} />

                <button type="button" onClick={handleClockIn}>
                    出勤
                </button>
                <button type="button" onClick={handleClockOut}>
                    退勤
                </button>
                {onBreak ? (
                    <button type="button" onClick={handleBreakEnd}>
                        休憩終了
                    </button>
                ) : (
                    <button type="button" onClick={handleBreakStart}>
                        休憩
                    </button>
                )}
                <button type="submit">送信</button>
                <a href="/dashboard">戻る</a>
            </form>
        </div>
    );
}

export default Attendance;
