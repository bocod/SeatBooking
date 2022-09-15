import React, { useState } from "react";

import MoviePicker from './MoviePicker/MoviePicker';
import SeatPicker from './SeatPicker/SeatPicker';

export default function Picker() {

    const [filmData, setFilmData] = useState('{"Name": "Unselected","Price": 0}');

    function SelectHandler (value) {
        setFilmData(value);
    };

    return (
        <>
            <MoviePicker SelectHandler={SelectHandler}/>
            <SeatPicker filmSelected={filmData}/>
        </>
    );
};
