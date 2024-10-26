import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import Modal from "react-modal";
import { useState } from "react";


//管理ページのインデックス配置よてい。
export default function Calendar() {
    const [modalIsOpen, setIsOpen] = useState(false);

    const [eventText, setEventText] = useState('')

    const calendarEvents = [
        {
            id: 1,
            title: "のみ",
            description:
                "リンクアンドモチベーションのアドベントカレンダーを書く",
            start: "2024-10-15",
            end: "2022-10-16",
            backgroundColor: "green",
            borderColor: "red",
            editable: true,
        },
        {
            id: 2,
            title: "旅行",
            description:
                "リンクアンドモチベーションのアドベントカレンダーを投稿する",
            start: "2024-10-18",
            end: "2024-10-18",
            backgroundColor: "green",
            borderColor: "red",
            editable: false,
        },
    ];
    const modalOpen = () => {
        setIsOpen(true);
    };
    return (
        <>
        <header>
            <a href=""></a>
        </header>
            <FullCalendar
                plugins={[
                    dayGridPlugin,
                    interactionPlugin,
                    timeGridPlugin,
                    listPlugin,
                ]}
                nowIndicator={true}
                selectable={true}
                selectHelper={true}
                allDaySlot={false}
                dateClick={modalOpen}
                //日本語化
                locale="ja"
                //ヘッダーの配置
                headerToolbar={{
                    left: "prev,next",
                    center: "title",
                    right: "dayGridMonth,listMonth,listDay",
                }}
                //フッターの配置
                footerToolbar={{
                    right: "prev,next",
                }}
                //ボタンに表示するテキスト
                buttonText={{
                    prev: "<",
                    next: ">",
                    prevYear: "<<",
                    nextYear: ">>",
                    today: "今日",
                    month: "カレンダー",
                    week: "週",
                    day: "日",
                    listMonth: "今月の予定",
                    listDay: "今日の予定",
                }}
                events={calendarEvents}
            />
            <Modal isOpen={modalIsOpen}>
                <button onClick={() => setIsOpen(false)}>Close Modal</button>
            </Modal>
        </>
    );
}
