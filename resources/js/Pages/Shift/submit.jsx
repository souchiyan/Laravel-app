import React from "react";
import { useForm } from "@inertiajs/react";

function submit(props) {
    const { periods, dates, year, month } = props;

    const { data, setData, post } = useForm({
        data: [],
        year: year,
        month: month,
    });

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
        post("/shift");
    };

    return (
        <>
            <div>
                <h2>各日の開始時間と終了時間</h2>
            </div>
            <form onSubmit={handleSendPosts}>
                {dates.map((date, index) => (
                    <div key={date}>
                        <label>{date}</label>
                        <input
                            type="time"
                            onChange={(e) =>
                                handleTimeChange(
                                    index,
                                    "start_at",
                                    e.target.value
                                )
                            }
                            value={data.data[index]?.start_at || ""}
                        />
                        ～
                        <input
                            type="time"
                            onChange={(e) =>
                                handleTimeChange(
                                    index,
                                    "end_at",
                                    e.target.value
                                )
                            }
                            value={data.data[index]?.end_at || ""}
                        />
                        <input
                            type="checkbox"
                            onClick={() => handleClearTime(index)}
                            style={{ marginLeft: "10px", cursor: "pointer" }}
                            id="checkbox"
                        />
                        <label htmlFor="checkbox">✕</label>
                    </div>
                ))}
                <button type="submit">データを送信</button>
            </form>

            <a href="/dashboard">戻る</a>
        </>
    );
}

export default submit;
