import React from 'react'
import { useState, useEffect } from "react";

export default function MoviePicker() {

    const [reqData, setReqData] = useState([]);
  
    useEffect(() => {
        fetch("http://localhost:3030/film-data")
        .then((res) => {
            return res.json();
        })
        .then((filmsAndPrices) => {
            setReqData(filmsAndPrices);
        });
    }, []);

    return (
        <>
            <div className='d-flex justify-content-center align-items-center mt-3'>  
                <label htmlFor="movieSelector">Pick a movie</label>
                <select id="movieSelector" className="form-select ms-3" aria-label="Movie selector" style={{"width":"fit-content","maxWidth":"400px"}}>
                    {reqData.map(
                        element => {
                            return (
                                <option key={element.Name} value={element}>{`${element.Name} ($${element.Price})`}</option>
                            )
                        }
                    )}
                </select>
            </div>
        </>
    )
}