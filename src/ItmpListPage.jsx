import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export const ItmpListPage=()=> {

    const[itmps,setItmps] = useState([]);
    const[isFetchPending, setFetchPending] = useState(false);
    
    useEffect(() => {
        setFetchPending(true);
        fetch("https://itmp.sulla.hu/users")
            .then((res) => res.json())
            .then((itmpk) => setItmps(itmpk))
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
                    <h2>ITMP bejegyzések</h2>
                    {itmps.map((itmp, index) => (

                        <div className="card col-sm-3 d-inline-block m-1 p-2" key={index}>
                            <p className="text-dark">ITMP bejegyzés neve: {itmp.name}</p>
                            <p className="text-danger">Email cím: {itmp.email}</p>
                            <div className="card-body">

                                <br />
                                <NavLink key="z" to={"/itmp/" + itmp.id}>
                                    <i className="bi bi-eye btn btn-primary"></i></NavLink> &nbsp;&nbsp;
                                <NavLink key="x" to={"/mod-itmp/" + itmp.id}>
                                    <i className="bi bi-pencil btn btn-warning"></i></NavLink> &nbsp;&nbsp;
                                    <NavLink key="y" to={"/del-itmp/" + itmp.id}><i className="bi bi-trash3 btn btn-danger"></i></NavLink>
                            </div>
                        </div>


                    ))}
                </div>
            )}
        </div>
    );
}