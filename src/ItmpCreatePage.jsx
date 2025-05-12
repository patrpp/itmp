import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export const ItmpCreatePage=()=>{
    const navigate = useNavigate();
    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Új ITMP bejegyzés</h2>
            <form
            onSubmit={(event) => {
            event.persist();
            event.preventDefault();
            fetch(`http://itmp.sulla.hu/users`, {
                method: "POST",
                //bekerült ez az "újítás", ami miatt nem ment:
                headers: {
                    'Content-Type': 'application/json',
                },
                // itt figyeljetek, mert BAL oldalra kell amit a backend-be írunk,
                //míg jobb oldalra az űrlap-elemek pontos nevei kerültek, kicsivel!!!

                body: JSON.stringify({
                    name: event.target.elements.name.value,
                    email: event.target.elements.email.value,
                }),
            })
            // ha kész, visszadob a főoldalra! Return-öl a backend-ről minden infót!
            .then(() =>
            {
                navigate("/");
            })
            .catch(console.log);
            }}>
            <div className="form-group row pb-3">
                <label className="col-sm-3 col-form-label">ITMP neve:</label>
                <div className="col-sm-9">
                <input type="text" name="name" className="form-control" />
                </div>
            </div>
            <div className="form-group row pb-3">
                <label className="col-sm-3 col-form-label">Email:</label>
                <div className="col-sm-9">
                <input type="text" name="email" className="form-control" />
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