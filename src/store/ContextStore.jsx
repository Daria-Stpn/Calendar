import React, { createContext, useState, useEffect } from "react";

export const ContextStore = createContext();

function StoreProvider({ children }) {
    const [events, setEvents] = useState(JSON.parse(localStorage.getItem("events")) || []);
    const addEvent = (event) => setEvents([...events, event]);
    useEffect(() => {
        localStorage.setItem("events", JSON.stringify(events));
    }, [events]);
    return (
        <ContextStore.Provider value={{ events, addEvent }}>
            {children}
        </ContextStore.Provider>
    );
}

export default StoreProvider;
