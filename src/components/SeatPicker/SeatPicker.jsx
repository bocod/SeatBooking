import React, { useState, useEffect } from "react";

export default function SeatPicker(props) {
    const [reqData, setReqData] = useState([]);
    const [seatSelection, setSeatSelection] = useState([]);
    const [filmPrice, setFilmPrice] = useState('');
    const [error, setError] = useState('');

    const notAssigned = { SeatNumber: "A", Available: true};
    const selected = { SeatNumber: "B", Available: "selected"};
    const occupied = { SeatNumber: "C", Available: false};

    const filmSelection = (JSON.parse(props.filmSelected));

    useEffect(()=>{
        setFilmPrice(filmSelection.Price)
    },[filmSelection]);

    useEffect(() => {
        fetch("http://localhost:3030/seats-data")
        .then((res) => {
            return res.json();
        })
        .then((seatsData) => {
            setReqData(seatsData.Availability);
        });
    }, []);

    const selectHandler = (event, status) => {

        const seatNum = Number(status.SeatNumber);
        const isSelected = (seatSelection.find(item => seatNum === item));
        if(filmSelection.Name === 'Unselected'){
            return (
                setError('You must select a film first...')
            )
        } else if(isNaN(seatNum)){
            return (
                setError('You cannot watch the movie on the corridor!!!')
            )
        } else {
            if(status.Available === false){
                return setError('That seat is already booked!!!');
            }
            if(isSelected === undefined){
                event.target.className = 'bg-info';
                setSeatSelection([...seatSelection, seatNum]);
                console.log('Agrega');
                console.log(seatSelection);
            }
            if(isSelected !== undefined){
                event.target.className = 'bg-light'
                setSeatSelection(seatSelection.filter(item => item !== seatNum));
                console.log('Borra');
                console.log(seatSelection);
            }
        }
    };

    const seatIcon = (status, index) => {
        const seatColorPicker = () => {
            if (status.Available === 'selected') {
                return 'bg-info';
            } else if (status.SeatNumber === 'corridor') {
                return 'bg-dark'
            } else if (status.Available === true) {
                return 'bg-white'
            } else if (status.Available === false) {
                return 'bg-secondary'
            }
        };

        return (
            <div
                className={seatColorPicker()}
                key={status.SeatNumber+index}
                style={{
                    width: "30px",
                    height: "30px",
                    margin: "5px",
                    borderRadius: "100% 100% 0 0"
                }}
                onClick={(event) => {selectHandler(event, status)}}
            >
            </div>
        )
    };

    const screen = () => {
        return (
            <div className='mt-3'>
                <span className="screelight" style={{
                    "filter": "drop-shadow(0px 2px 7px white)"
                }}>
                    <span className="screen" style={{
                        "background": "white",
                        "padding": "50px 225px",
                        "width": "300px",
                        "height": "150px",
                        "clipPath": "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                    }}></span>
                </span>
            </div>
        )
    };

    const alertError = () => {
        return (
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Error: </strong> {error}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={e => {setError('')}}></button>
            </div>
        )
    };

    return (
        <>
            <div className='mt-3 d-flex flex-column align-items-center' style={{"width":"500px"}}> 
                <div className='mt-3 d-flex justify-content-between' style={{"width":"400px"}}>
                    <div className='d-flex align-items-center'>{seatIcon(notAssigned)} <p className='m-0 ps-2 text-secondary'><abbr title="Not assigned">N/A</abbr></p></div>
                    <div className='d-flex align-items-center'>{seatIcon(selected)} <p className='m-0 ps-2 text-secondary'> Selected</p></div>
                    <div className='d-flex align-items-center'>{seatIcon(occupied)} <p className='m-0 ps-2 text-secondary'> Occupied</p></div>
                </div>
                <div className='mt-5 bg-dark w-100'>
                    {screen()}
                    <div className='m-auto mt-5 mb-5 pt-3 d-flex flex-wrap justify-content-between align-items-center' style={{"width":"400px"}}>
                        {reqData.map(
                            (element, index) => {
                                return (
                                    seatIcon(element, index)
                                )
                            }
                        )}
                    </div>
                </div>
                {error ? alertError() : ""}
            </div>
            <div>
                { seatSelection.length === 0 ? 
                    <p>
                        "Please select a seat..."
                    </p> 
                : 
                    <p> You have selected 
                        <span className='text-info fw-bold'> {seatSelection.length} </span>
                        <span>{seatSelection.length === 1 ? 'seat' : 'seats'} </span>
                        for a price of
                        <span className='text-info fw-bold'> ${(Number(filmPrice) * Number(seatSelection.length)).toFixed(2)}</span>
                    </p>
                }
            </div>
        </>
    )
}