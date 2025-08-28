import React from 'react'
import s from './Header.module.scss'
import { BsCalendar3, BsCalendar4Week } from "react-icons/bs";
import { IoTodayOutline } from "react-icons/io5";

function Header(props) {
  return (
    <header className={s.wrapper}>
    <nav className={s.navBar}>
        <a href="" className={s.link}>Main</a>
        <a href="" className={s.link}>
            <BsCalendar3 />
            <span>Month</span>
        </a>
        <a href="" className={s.link}>
            <BsCalendar4Week />
            <span>Week</span>
        </a>
        <a href="" className={s.link}>
            <IoTodayOutline />
            <span>Day</span>
        </a>
    </nav>
</header>
  )
}


export default Header
