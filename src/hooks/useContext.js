import React, { createContext, useState } from 'react';

export const AppContext = createContext(null);

const Context = ({ children }) => {
    const [username, setUsername] = useState("");
    const [Id, setId] = useState("")
    const [steps, setSteps] = useState([])
    const [serials, setSerials] = useState([]);
    return (
        <AppContext.Provider value={{ username, setUsername, setId, Id, setSteps, steps, setSerials, serials}}>
            {children}
        </AppContext.Provider>
    );
}

export default Context;
