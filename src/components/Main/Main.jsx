import React from "react";
import style from "./Main.module.scss";
import AddForm from "../AddForm/AddForm";
import { FaRegCalendarPlus } from "react-icons/fa";
import MCalendar from "../MCalendar/MCalendar";
import { Routes, Route } from "react-router";
import WCalendar from "../WCalendar/WCalendar";


function Main(props) {
    const [modalOpen, setModalOpen] = React.useState(false);
    return (
        <main className={style.wrapper}>
            <Routes>
                <Route path="/" element={<MCalendar />} />
                <Route path="/week" element={<WCalendar/>} />
                <Route path="/day" element={<div>day</div>} />
            </Routes>
            {modalOpen && <AddForm open={setModalOpen} />}
            <button
                className={style.addButton}
                onClick={() => setModalOpen(true)}
            >
                <FaRegCalendarPlus />
            </button>
        </main>
    );
}

export default Main;
