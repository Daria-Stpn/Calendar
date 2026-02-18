import React from "react";
import s from "./Header.module.scss";
import { BsCalendar3, BsCalendar4Week } from "react-icons/bs";
import { IoTodayOutline } from "react-icons/io5";
import { NavLink } from "react-router";
import { useAuth } from "../../hooks/useAuth";

function Header(props) {
    let { isAuthenticated, login, logout } = useAuth();
    return (
        <header className={s.wrapper}>
            <nav className={s.navBar}>
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? s.active : s.link)}
                >
                    <BsCalendar3 />
                    <span>Month</span>
                </NavLink>
                <NavLink
                    to="/week"
                    className={({ isActive }) => (isActive ? s.active : s.link)}
                >
                    <BsCalendar4Week />
                    <span>Week</span>
                </NavLink>
                <NavLink
                    to="/day"
                    className={({ isActive }) => (isActive ? s.active : s.link)}
                >
                    <IoTodayOutline />
                    <span>Day</span>
                </NavLink>
                {!isAuthenticated ? (
                    <>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive ? s.active : s.link
                            }
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            className={({ isActive }) =>
                                isActive ? s.active : s.link
                            }
                        >
                            Register
                        </NavLink>
                    </>
                ) : (
                    <span onClick={logout}>Log out</span>
                )}
            </nav>
        </header>
    );
}

export default Header;
