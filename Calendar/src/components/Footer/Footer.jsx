import React from "react";
import style from "./Footer.module.scss";


function Footer(props) {
    return (
        <footer className={style.wrapper}>
            &copy;Robocode {new Date().getFullYear()}
        </footer>
    );
}


export default Footer;