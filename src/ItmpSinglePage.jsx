import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

export const ItmpSinglePage =()=> {

    const params = useParams();
    const id = params.ItmpId;
    const[itmp,setItmps] = useState([]);
    const[isPending, setPending] = useState(false);
    useEffect(() => {
        setPending(true);
        (async () => {
            try {
        const res= await fetch(`https://itmp.sulla.hu/users/${id}`)
            const itmp = await res.json();
            setItmps(itmp);
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
            {isPending || !itmp.id ? (
                <div className="spinner-border"></div>
            ) : (
                            <div className="card p-3">
                                <div className="card-body">
                                <h5 className="card-title">Itmp neve: {itmp.name}</h5>
                                <div className="lead">Email cím: {itmp.email}</div>
                                
        
                                <br />
                                  </div>
                                  <div><NavLink to="/"><i className="bi bi-backspace btn btn-primary"></i></NavLink> &nbsp;&nbsp;&nbsp;
<NavLink key="y" to={"/mod-itmp/" + itmp.id}><i className="bi bi-pencil btn btn-warning "></i></NavLink></div>   
                            </div>
                        
                    )}
                </div>
            );
}