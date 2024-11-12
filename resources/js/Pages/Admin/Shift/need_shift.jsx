

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "react-modal";
import AuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";


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

        setSelectedShift(shiftForDay || null);
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
                title: `${selectedShift.user.name}: ${formatTime(
                    selectedShift.start_at
                )} ~ ${formatTime(selectedShift.end_at)}`,
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

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    return (

        <>
    
        <div>
            <h2>提出されたシフト</h2>
            <a href="/admin/dashboard">戻る</a>

            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                events={calendarEvents}
                dateClick={handleDateClick}
                locale="ja"
            />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="シフト確認モーダル"
                ariaHideApp={false}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 1000,
                    },
                    content: {
                        width: "300px",
                        margin: "auto",
                        padding: "20px",
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        zIndex: 1001,
                    },
                }}
            >
                <h2>シフト確認</h2>
                {selectedShift ? (
                    <>
                        <p>ユーザー: {selectedShift.user.name}</p>
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
        </>
    );
}

export default NeedShift;
