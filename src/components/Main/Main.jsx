import React from "react";
import style from "./Main.module.scss";
import AddForm from "../AddForm/AddForm";
import { FaRegCalendarPlus } from "react-icons/fa";

function Main(props) {
    const [modalOpen, setModalOpen] = React.useState(false);
    return (
        <main className={style.wrapper}>
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
