import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

export const InstrumentsSinglePage =()=> {

    const params = useParams();
    const id = params.InstrumentsId;
    const[instruments,setInstruments] = useState([]);
    const[isPending, setPending] = useState(false);
    useEffect(() => {
        setPending(true);
        (async () => {
            try {
        const res= await fetch(`https://localhost:3001/instrument/${id}`)
            const instruments = await res.json();
            setInstruments(instruments);
        }
        catch(error) {
            console.log(error);
        }
        finally {
            setPending(false);
        }
    })
    ();
 }, [id]);

    return (
        <div className="p-5 m-auto text-center content bg-lavender">
            {isPending || !instruments.id ? (
                <div className="spinner-border"></div>
            ) : (
                            <div className="card p-3">
                                <div className="card-body">
                                <h5 className="card-title">hangszer neve: {instruments.name}</h5>
                                <div className="lead">Márkája: {instruments.brand}</div>
                                <div className="lead">Ára: {instruments.price}</div>
                                <div className="lead">Darabszáma: {instruments.quantity}</div>
                                <div className="lead">Kép-linkje: {instruments.imageURL}</div>
                                
        
                                <br />
                                  </div>
                                  <div><NavLink to="/"><i className="bi bi-backspace btn btn-primary"></i></NavLink> &nbsp;&nbsp;&nbsp;
<NavLink key="y" to={"/mod-instruments/" + instruments.id}><i className="bi bi-pencil btn btn-warning "></i></NavLink></div>   
                            </div>
                        
                    )}
                </div>
            );
}