import { useState, useEffect } from "react";

const FetchSeatsData = () => {
    const [seatsData, setSeatsData] = useState([]);
  
    useEffect(() => {
        fetch("http://localhost:3030/seats-data")
        .then((res) => {
            return res.json();
        })
        .then((seatsInfo) => {
            setSeatsData(seatsInfo);
        });
    }, []);

    return seatsData;
};

export default FetchSeatsData;