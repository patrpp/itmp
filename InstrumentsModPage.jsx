import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

export const InstrumentsModPage =()=> {
    const params = useParams();
    const id = params.InstrumentsId;
    const navigate = useNavigate();
    const [instruments, setInstruments] = useState({
        name: '',
        brand: '',
        price:'',
        quantity:'',
        imageURL:''
    });
    useEffect(() => {
        const fetchInstrumentsData = async () => {
            try {
                const response = await axios.get(`https://localhost:3001/instruments/${id}`);
                setInstruments(response.data);
            } catch (error) {
                console.log('Error fetching instruments data:', error);
            }
        };

        fetchInstrumentsData();
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setInstruments(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`https://localhost:3001/instruments/${id}`, instruments)
        .then(() => {
            navigate("/");
        })
        .catch(error => {
            console.log('Error updating instruments data:', error);
        });
};

    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Egy hangszer módosítása</h2>
            <form onSubmit={handleSubmit}>
                
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Hangszer neve:</label>
                    <div className="col-sm-9">
                        <input type="text" name="name" className="form-control" defaultValue={instruments.name} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Hangszer márkája</label>
                    <div className="col-sm-9">
                        <input type="text" name="brand" className="form-control" defaultValue={instruments.brand} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Ára</label>
                    <div className="col-sm-9">
                        <input type="number" name="price" className="form-control" defaultValue={instruments.price} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Készlete:</label>
                    <div className="col-sm-9">
                        <input type="number" name="quantity" className="form-control" defaultValue={instruments.quantity} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Kép-linkje:</label>
                    <div className="col-sm-9">
                        <input type="text" name="imageURL" className="form-control" defaultValue={instruments.imageURL} onChange={handleInputChange}/>
                    </div>
                </div>
                <NavLink to="/"> <i className='bi bi-backspace btn btn-danger'> Vissza</i></NavLink>
                &nbsp;&nbsp;&nbsp;
                <button type="submit" className="btn btn-success">Küldés</button>
            </form>
        </div>
    );
};