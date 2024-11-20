import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";

function Attendance() {
    const { data, setData, post, reset } = useForm({
        start_at: localStorage.getItem("start_at") || "",
        end_at: localStorage.getItem("end_at") || "",
        break_start_at: "",
        break_end_at: "",
    });

    useEffect(() => {
        localStorage.setItem("start_at", data.start_at);
        localStorage.setItem("end_at", data.end_at);

        // 休憩データが空の場合はlocalStorageから削除
        if (!data.break_start_at) localStorage.removeItem("break_start_at");
        if (!data.break_end_at) localStorage.removeItem("break_end_at");
    }, [data]);

    const [modalMessage, setModalMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [onBreak, setOnBreak] = useState(
        () => localStorage.getItem("onBreak") === "true"
    );

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
        setData("start_at", time);
        showModalWithMessage(`${time} - 出勤しました`);
    };

    const handleClockOut = () => {
        const time = getCurrentTime();
        setData("end_at", time);
        showModalWithMessage(`${time} - 退勤しました`);
    };

    const handleBreakStart = () => {
        const time = getCurrentTime();
        setOnBreak(true);
        setData("break_start_at", time);
        localStorage.setItem("onBreak", "true");
        showModalWithMessage(`${time} - 休憩を開始しました`);
    };

    const handleBreakEnd = () => {
        const time = getCurrentTime();
        setOnBreak(false);
        setData("break_end_at", time);
        localStorage.setItem("onBreak", "false");
        showModalWithMessage(`${time} - 休憩を終了しました`);
    };

    const handleSendPosts = (e) => {
        e.preventDefault();

        // 不要なデータを除外
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(
                ([key, value]) => value !== null && value !== ""
            )
        );

        post("/attendances", {
            data: filteredData,
            onFinish: () => {
                showModalWithMessage("送信が完了しました。お疲れさまでした。");
                reset(); // フォームデータをリセット
                localStorage.removeItem("start_at");
                localStorage.removeItem("end_at");
                localStorage.removeItem("break_start_at");
                localStorage.removeItem("break_end_at");
                localStorage.removeItem("onBreak");
            },
        });
    };

    const showModalWithMessage = (message) => {
        setModalMessage(message);
        setShowModal(true);
        setTimeout(() => setShowModal(false), 4000);
    };

    return (
        <div>
            <div className="bg-gray-600 flex flex-row items-center justify-between py-6 px-4 md:px-8 mb-10 flex-nowrap">
                <div>
                    <a
                        href="/dashboard"
                        className="text-white border border-gray-300 rounded-lg px-6 py-2 hover:bg-gray-400 transition"
                    >
                        戻る
                    </a>
                </div>
                <h2 className="font-bold text-white text-center text-2xl">
                    出退勤
                </h2>
            </div>

            {showModal && (
                <div className="modal fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg">
                        <p className="font-bold text-xl">{modalMessage}</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendPosts} className="space-y-8">
                <input type="hidden" value={data.start_at} />
                <input type="hidden" value={data.end_at} />
                <input type="hidden" value={data.break_start_at} />
                <input type="hidden" value={data.break_end_at} />

                <div className="flex justify-center space-x-8">
                    <button
                        type="button"
                        onClick={handleClockIn}
                        className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition"
                    >
                        出勤
                    </button>
                    <button
                        type="button"
                        onClick={handleClockOut}
                        className="bg-red-500 text-white px-8 py-4 rounded-lg hover:bg-red-600 transition"
                    >
                        退勤
                    </button>
                    {onBreak ? (
                        <button
                            type="button"
                            onClick={handleBreakEnd}
                            className="bg-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 transition"
                        >
                            休憩終了
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleBreakStart}
                            className="bg-yellow-500 text-white px-8 py-4 rounded-lg hover:bg-yellow-600 transition"
                        >
                            休憩
                        </button>
                    )}
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-gray-500 text-white px-8 py-4 rounded-lg hover:bg-gray-600 transition"
                    >
                        送信
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Attendance;
