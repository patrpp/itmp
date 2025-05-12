import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

export const ItmpModPage =()=> {
    const params = useParams();
    const id = params.ItmpId;
    const navigate = useNavigate();
    const [itmp, setItmp] = useState({
        name: '',
        email: ''
    });
    useEffect(() => {
        const fetchItmpData = async () => {
            try {
                const response = await axios.get(`https://itmp.sulla.hu/users/${id}`);
                setItmp(response.data);
            } catch (error) {
                console.log('Error fetching itmp data:', error);
            }
        };

        fetchItmpData();
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setItmp(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`https://itmp.sulla.hu/users/${id}`, itmp)
        .then(() => {
            navigate("/");
        })
        .catch(error => {
            console.log('Error updating itmp data:', error);
        });
};

    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Egy ITMP módosítása</h2>
            <form onSubmit={handleSubmit}>
                
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">ITMP bejegyzés neve:</label>
                    <div className="col-sm-9">
                        <input type="text" name="name" className="form-control" defaultValue={itmp.name} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Email cím:</label>
                    <div className="col-sm-9">
                        <input type="text" name="email" className="form-control" defaultValue={itmp.email} onChange={handleInputChange}/>
                    </div>
                </div>
                <NavLink to="/"> <i className='bi bi-backspace btn btn-danger'> Vissza</i></NavLink>
                &nbsp;&nbsp;&nbsp;
                <button type="submit" className="btn btn-success">Küldés</button>
            </form>
        </div>
    );
};