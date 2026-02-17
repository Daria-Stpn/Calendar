import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import style from "./MCalendar.module.scss";
import { ContextStore } from "../../store/ContextStore";


function MCalendar(props) {
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
                        {Array.from(
                            { length: Math.ceil(dates.length / 7) },
                            (_, weekIndex) => (
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
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

MCalendar.propTypes = {};

export default MCalendar;

const getCalendarDates = (year, month) => {
    // Створюємо об'єкти для початку та кінця місяця
    const startOfMonth = new Date(year, month, 0);
    const endOfMonth = new Date(year, month + 1, 0);

    // Отримуємо день тижня для початку місяця
    const startDay = startOfMonth.getDay() - 1 || 7;

    // Отримуємо загальну кількість днів у місяці
    const totalDays = endOfMonth.getDate() + 1;

    const dates = [];
    for (let i = 1 - startDay; i <= totalDays; i++) {
        const date = new Date(year, month, i);
        dates.push(date);
    }
    return dates;
};
