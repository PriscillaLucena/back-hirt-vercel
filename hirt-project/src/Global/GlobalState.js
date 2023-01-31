import { GlobalContext } from "./GlobalContext";
import React, { useState } from "react";

export const GlobalState = (props) => {

    const [level, setLevel] = useState('');
    const [apartaments, setApartments] = useState('');
    const [conclusion, setConclusion] = useState(false);
    const [image, setImage] = useState('');
    

    const states = {
        level,
        apartaments,
        conclusion,
        image,
        
    };

    const setters = {
        setLevel,
        setApartments,
        setConclusion,
        setImage,
    };

    const dados = {
        // apAtual
    };


    return (
        <GlobalContext.Provider value={{ states, setters, dados }}>
            {props.children}
        </GlobalContext.Provider>
    )
};