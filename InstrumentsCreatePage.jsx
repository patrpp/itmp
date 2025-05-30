import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export const InstrumentsCreatePage=()=>{
    const navigate = useNavigate();
    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Új hangszer</h2>
            <form
            onSubmit={(event) => {
            event.persist();
            event.preventDefault();
            fetch(`http://localhost:3001/instruments`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    name: event.target.elements.name.value,
                    email: event.target.elements.email.value,
                }),
            })
            .then(() =>
            {
                navigate("/");
            })
            .catch(console.log);
            }}>
            <div className="form-group row pb-3">
                <label className="col-sm-3 col-form-label">Hangszer neve:</label>
                <div className="col-sm-9">
                <input type="text" name="name" className="form-control" />
                </div>
            </div>
            <div className="form-group row pb-3">
                <label className="col-sm-3 col-form-label">Márkája:</label>
                <div className="col-sm-9">
                <input type="text" name="brand" className="form-control" />
                </div>
            </div>
            <div className="form-group row pb-3">
                <label className="col-sm-3 col-form-label">Ára:</label>
                <div className="col-sm-9">
                <input type="text" name="price" className="form-control" />
                </div>
            </div>
            <div className="form-group row pb-3">
                <label className="col-sm-3 col-form-label">Darabszáma:</label>
                <div className="col-sm-9">
                <input type="text" name="quantity" className="form-control" />
            </div> 
            </div>
            <div className="form-group row pb-3">
                <label className="col-sm-3 col-form-label">Kép-linkje:</label>
                <div className="col-sm-9">
                <input type="text" name="imageURL" className="form-control" />
                </div>
                </div>

            <NavLink to="/"> <i className='bi bi-backspace btn btn-danger'> Vissza</i></NavLink>
            &nbsp;&nbsp;&nbsp;
            <button type="submit" className="btn btn-success">
                Küldés
            </button>
            </form>
        </div>
    );
};