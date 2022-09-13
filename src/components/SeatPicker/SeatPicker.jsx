import React from 'react'
import { useState, useEffect } from "react";

export default function SeatPicker() {

    const [reqData, setReqData] = useState([]);
  
    useEffect(() => {
        fetch("http://localhost:3030/seats-data")
        .then((res) => {
            return res.json();
        })
        .then((seatsData) => {
            setReqData(seatsData.Availability);
        });
    }, []);

    const seatIcon = (status) => {
        const bgColor = () => { 

                switch(status) {
                        
                    case "selected":
                        return "cyan"
                        
                    case "corridor":
                        return "#282c34"

                    case true:
                    return "white"
                        
                    case false:
                        return "gray"

                    default:
                        return "green"
                }
            
        }
        return (
            <div
                style={{
                    "background" : {bgColor},
                    "width": "25px",
                    "height": "25px",
                    "borderRadius": "100% 100% 0 0"
                }}
            >
            </div>
        )
    }

    const screen = () => {
        return (
            <div className='mt-3'>
                <span className="screelight" style={{
                    "filter": "drop-shadow(0px 2px 3px white)"
                }}>
                    <span className="screen" style={{
                        "background": "white",
                        "padding": "50px 200px",
                        "width": "300px",
                        "height": "150px",
                        "clipPath": "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                    }}></span>
                </span>
            </div>
        )
    }

    return (
        <div className='mt-3 d-flex flex-column align-items-center' style={{"width":"500px"}}> 
            <div className='d-flex justify-content-between' style={{"width":"400px"}}>
                <div className='d-flex'>{seatIcon(false)} <p className='ms-2 text-secondary'> N/A</p></div>
                <div className='d-flex'>{seatIcon("selected")} <p className='ms-2 text-secondary'> Selected</p></div>
                <div className='d-flex'>{seatIcon(true)} <p className='ms-2 text-secondary'> Occupied</p></div>
            </div>
            <div className='mt-5'>
                {screen()}
                <div className='mt-5 d-flex flex-wrap justify-content-center align-items-center' style={{"width":"400px"}}>
                    {reqData.map(
                        (element, index) => {
                            return (
                                seatIcon(element.Available)

                            )
                        }
                    )}
                </div>
            </div>
        </div>
    )
}