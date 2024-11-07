import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "react-modal";

function NeedShift({ shifts }) {
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedShift, setSelectedShift] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleDateClick = (arg) => {
        const shiftForDay = shifts.find((shift) => {
            const shiftDate = new Date(shift.start_at).toDateString();
            return shiftDate === new Date(arg.dateStr).toDateString();
        });

        setSelectedShift(shiftForDay || null); // shiftForDayが存在しない場合はnullをセット
        setSelectedDate(arg.date);
        setModalIsOpen(true);
        setIsConfirmed(false);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedShift(null);
        setSelectedDate(null);
    };

    const handleConfirm = () => {
        if (selectedShift && isConfirmed) {
            const newEvent = {
                title: `${formatTime(selectedShift.start_at)} ~ ${formatTime(
                    selectedShift.end_at
                )}`,
                start: selectedShift.start_at,
                end: selectedShift.end_at,
                allDay: false,
            };
            setCalendarEvents((prevEvents) => [...prevEvents, newEvent]);
        }
        closeModal();
    };

    const handleCheckboxChange = () => {
        setIsConfirmed((prev) => !prev);
    };

    // 日付文字列から時刻を "HH:mm" 形式で取得する関数
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getHours().toString().padStart(2, "0"); // 時を2桁表示
        const minutes = date.getMinutes().toString().padStart(2, "0"); // 分を2桁表示
        return `${hours}:${minutes}`;
    };

    return (
        <div>
            <h1>提出されたシフト</h1>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                events={calendarEvents}
                dateClick={handleDateClick}
                locale="ja"
            />
            {/* モーダル */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="シフト確認モーダル"
                ariaHideApp={false}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // 背景を半透明ではなくしっかりした色に
                        zIndex: 1000, // モーダルの背後の他の要素がクリックされないようにする
                    },
                    content: {
                        width: "300px",
                        margin: "auto",
                        padding: "20px",
                        borderRadius: "8px",
                        backgroundColor: "#fff", // モーダルの背景色
                        border: "1px solid #ccc", // 枠線を追加
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // 少し影をつけて立体感を出す
                        zIndex: 1001, // モーダルのコンテンツのz-indexを設定して、背景と重ならないようにする
                    },
                }}
            >
                <h2>シフト確認</h2>
                {selectedShift ? (
                    <>
                        <p>
                            日付: {selectedDate && selectedDate.toDateString()}
                        </p>
                        <p>開始時間: {formatTime(selectedShift.start_at)}</p>
                        <p>終了時間: {formatTime(selectedShift.end_at)}</p>
                        <label
                            style={{
                                display: "block",
                                margin: "10px 0",
                                cursor: "pointer",
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={isConfirmed}
                                onChange={handleCheckboxChange}
                                style={{ marginRight: "8px" }}
                            />
                            シフトを確定する
                        </label>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "20px",
                            }}
                        >
                            <button
                                onClick={handleConfirm}
                                disabled={!isConfirmed}
                                style={{ padding: "5px 10px" }}
                            >
                                確定
                            </button>
                            <button
                                onClick={closeModal}
                                style={{ padding: "5px 10px" }}
                            >
                                キャンセル
                            </button>
                        </div>
                    </>
                ) : (
                    <p>シフト情報がありません</p>
                )}
            </Modal>
        </div>
    );
}

export default NeedShift;
