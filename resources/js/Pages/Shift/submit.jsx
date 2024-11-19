import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

function Submit(props) {
    const { periods, dates, year, month } = props;

    const { data, setData, post } = useForm({
        data: [],
        year: year,
        month: month,
    });

    const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの開閉状態を管理

    // 時間の変更を処理する関数
    const handleTimeChange = (index, field, value) => {
        const updatedData = [...data.data];

        if (!updatedData[index]) {
            updatedData[index] = {
                date: dates[index],
                start_at: null,
                end_at: null,
            };
        }

        updatedData[index][field] = value;
        setData("data", updatedData);
    };

    // ✕ボタンを押したときにstart_atとend_atをnullにする関数
    const handleClearTime = (index) => {
        const updatedData = [...data.data];

        if (updatedData[index]) {
            updatedData[index].start_at = null;
            updatedData[index].end_at = null;
        } else {
            updatedData[index] = {
                date: dates[index],
                start_at: null,
                end_at: null,
            };
        }

        setData("data", updatedData);
    };

    // フォーム送信
    const handleSendPosts = (e) => {
        e.preventDefault();
        post("/shift", {
            onFinish: () => setIsModalOpen(true), // 送信完了後にモーダルを表示
        });
    };

    // モーダルを閉じる関数
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {/* ヘッダー部分 */}
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
                    各日の開始時間と終了時間
                </h2>
            </div>

            {/* フォーム部分 */}
            <form
                onSubmit={handleSendPosts}
                className="text-center mx-auto max-w-4xl space-y-6"
            >
                {dates.map((date, index) => (
                    <div
                        key={date}
                        className="flex flex-wrap items-center justify-between bg-white p-4 rounded-lg shadow-md"
                    >
                        {/* 日付 */}
                        <label className="font-bold text-lg w-1/3 text-left">
                            {date}日
                        </label>

                        {/* 開始時間 */}
                        <input
                            type="time"
                            className="w-1/4 font-bold text-lg px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={(e) =>
                                handleTimeChange(
                                    index,
                                    "start_at",
                                    e.target.value
                                )
                            }
                            value={data.data[index]?.start_at || ""}
                        />

                        <span className="w-1/12 text-center font-bold">～</span>

                        {/* 終了時間 */}
                        <input
                            type="time"
                            className="w-1/4 font-bold text-lg px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={(e) =>
                                handleTimeChange(
                                    index,
                                    "end_at",
                                    e.target.value
                                )
                            }
                            value={data.data[index]?.end_at || ""}
                        />

                        {/* チェックボックス */}
                        <div className="w-1/6 flex justify-center">
                            <input
                                type="checkbox"
                                id={`checkbox-${index}`}
                                className="peer hidden"
                                onClick={() => handleClearTime(index)}
                            />
                            <label
                                htmlFor={`checkbox-${index}`}
                                className="flex items-center justify-center w-10 h-10 border-2 border-gray-400 rounded-full cursor-pointer hover:bg-gray-400 peer-checked:bg-red-500 peer-checked:text-white peer-checked:border-red-500"
                            >
                                ✕
                            </label>
                        </div>
                    </div>
                ))}

                {/* 送信ボタン */}
                <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md bg-gray-700 px-8 py-3 text-white text-lg font-medium shadow-lg transition hover:bg-gray-600 active:scale-95"
                >
                    送信
                </button>
            </form>

            {/* 提出完了モーダル */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <h2 className="text-2xl font-semibold text-center text-green-600">
                            提出が完了しました。
                        </h2>
                        <div className="mt-4 text-center">
                            <button
                                onClick={handleCloseModal}
                                className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
                            >
                                閉じる
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Submit;
