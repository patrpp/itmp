import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export const InstrumentsListPage=()=> {

    const[instrumentss,setInstrumentss] = useState([]);
    const[isFetchPending, setFetchPending] = useState(false);
    
    useEffect(() => {
        setFetchPending(true);
        fetch("https://localhost:3001/instruments")
            .then((res) => res.json())
            .then((instrumentsk) => setInstrumentss(instrumentsk))
            .catch(console.log)
            .finally(() => {
                setFetchPending(false);
            });
    }, []);
    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isFetchPending ? (
                <div className="spinner-border"></div>
            ) : (
                <div>
                    <h2>Hangszerek</h2>
                    {instrumentss.map((instruments, index) => (

                        <div className="card col-sm-3 d-inline-block m-1 p-2" key={index}>
                            <p className="text-dark">Hangszer márkája: {instruments.brand}</p>
                            <p className="text-dark">Hangszer neve: {instruments.name}</p>
                            <p className="text-danger"> {instruments.price} HUF </p>
                            <p className="text-dark">Készleten: {instruments.quantity} db</p>
                            <p className="text-dark"> {instruments.imageURL}</p>
                            <div className="card-body">

                                <br />
                                <NavLink key="z" to={"/instruments/" + instruments.id}>
                                    <i className="bi bi-eye btn btn-primary"></i></NavLink> &nbsp;&nbsp;
                                <NavLink key="x" to={"/mod-instruments/" + instruments.id}>
                                    <i className="bi bi-pencil btn btn-warning"></i></NavLink> &nbsp;&nbsp;
                                    <NavLink key="y" to={"/del-instruments/" + instruments.id}><i className="bi bi-trash3 btn btn-danger"></i></NavLink>
                            </div>
                        </div>


                    ))}
                </div>
            )}
        </div>
    );
}