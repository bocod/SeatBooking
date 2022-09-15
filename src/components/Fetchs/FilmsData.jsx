import React, { useState, useEffect } from "react";

const FetchFilmData = () => {
    const [filmsData, setFilmData] = useState([]);
  
    useEffect(() => {
        fetch("http://localhost:3030/all-data")
        .then((res) => {
            return res.json();
        })
        .then((filmsAndPrices) => {
            setFilmData(filmsAndPrices);
        });
    }, []);

    return filmsData;
};

export default FetchFilmData;