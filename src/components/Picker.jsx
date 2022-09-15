import React from 'react';
import { useState, useEffect } from "react";

import MoviePicker from './MoviePicker/MoviePicker';
import SeatPicker from './SeatPicker/SeatPicker';

export default function Picker() {

    const [filmData, setFilmData] = useState([]);
  
    useEffect(() => {
        fetch("http://localhost:3030/film-data")
        .then((res) => {
            return res.json();
        })
        .then((filmsAndPrices) => {
            setFilmData(filmsAndPrices);
        });
    }, []);

    return (
        <>
            <MoviePicker/>
            <SeatPicker {...filmData}/>
        </>
    );
};
