import React from "react";
import style from "./Main.module.scss";
import AddForm from "../AddForm/AddForm";
import { FaRegCalendarPlus } from "react-icons/fa";
import MCalendar from "../MCalendar/MCalendar";
import { Routes, Route } from "react-router";
import WCalendar from "../WCalendar/WCalendar";
import DCalendar from "../DCalendar/DCalendar";
import Modal from "../Modal/Modal";
import RegisterPage from "../Auth/RegisterPage";
import LoginPage from "../Auth/LoginPage";


function Main(props) {
    const [modalOpen, setModalOpen] = React.useState(false);
    return (
        <main className={style.wrapper}>
            <Routes>
                <Route path = "/register" element={<RegisterPage/>}/>
                <Route path = "/login" element={<LoginPage/>}/>
                <Route path="/" element={<MCalendar />} />
                <Route path="/week" element={<WCalendar/>} />
                <Route path="/day" element={<DCalendar/>} />
            </Routes>
            {modalOpen && <Modal open={setModalOpen} />}
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
