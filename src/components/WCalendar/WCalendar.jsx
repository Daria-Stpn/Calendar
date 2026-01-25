import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import style from "./WCalendar.module.scss";
import { ContextStore } from "../../store/ContextStore";


function WCalendar(props) {
    const [currentDate, setCurrentDate] = useState(new Date());

    let { events } = useContext(ContextStore);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dates = getCalendarDates(year, month);

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <table>
                    <thead>
                        <tr>
                            <th>Monday</th>
                            <th>Tuesday</th>
                            <th>Wednesday</th>
                            <th>Thursday</th>
                            <th>Friday</th>
                            <th>Saturday</th>
                            <th>Sunday</th>
                        </tr>
                    </thead>
                    <tbody>
                                <tr key={weekIndex}>
                                    {dates
                                        .slice(weekIndex * 7, weekIndex * 7 + 7)
                                        .map((date, index) => (
                                            <td key={index}>
                                                <span className={style.number}>
                                                    {date.getUTCDate()}
                                                </span>
                                                {events
                                                    .filter(
                                                        (event) =>
                                                            event.date ==
                                                            date
                                                                .toISOString()
                                                                .split("T")[0]
                                                    )
                                                    .map((event, i) => (
                                                        <button
                                                            key={i}
                                                            className={
                                                                style.event
                                                            }
                                                            style={{
                                                                borderLeftColor:
                                                                    event.color,
                                                            }}
                                                        >
                                                            {event.title}
                                                        </button>
                                                    ))}
                                            </td>
                                        ))}
                                </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

WCalendar.propTypes = {};

export default WCalendar;

const getCalendarDates = (year, month) => {
    
    const startOfWeek = new Date(year, month, currentDate.getDate() - currentDate.getDay() + 2);

    const dates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(year, month, startOfWeek.getDate() + i);
        dates.push(date);
    }
    return dates;
};
