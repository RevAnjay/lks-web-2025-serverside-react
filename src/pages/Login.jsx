import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [id_card_number, setID] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");

        if (id_card_number == "" || password == "") {
            setError("ID Card Number or Password incorrect");
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/v1/auth/login", {
                id_card_number: id_card_number,
                password: password
            });

            // if (response.data.status == "success") {
            //     Navigate("/dashboard");
            // }
            if (response.data.status != "success") setError(response.data.message);

            localStorage.setItem("token", response.data.token);
            navigate("/dashboard", {
                state: { message: "Berhasil Login", user: response.data }
            });
        } catch (err) {
            setError(err.message);
        }

    }


  return (
    <div>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
            <div className="container">
                <a className="navbar-brand" href="#">Installment Cars</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <main>
            <header className="jumbotron">
                <div className="container text-center">
                    <h1 className="display-4">Installment Cars</h1>
                </div>
            </header>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        { error && <div className="alert alert-danger">{ error }</div>}
                        <form className="card card-default" onSubmit={handleLogin}>
                            <div className="card-header">
                                <h4 className="mb-0">Login</h4>
                            </div>
                            
                            <div className="card-body">
                                <div className="form-group row align-items-center">
                                    <div className="col-4 text-right">ID Card Number</div>
                                    <div className="col-8"><input type="text" className="form-control" value={id_card_number} onChange={e => setID(e.target.value)}></input></div>
                                </div>
                                <div className="form-group row align-items-center">
                                    <div className="col-4 text-right">Password</div>
                                    <div className="col-8"><input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)}></input></div>
                                </div>
                                <div className="form-group row align-items-center mt-4">
                                    <div className="col-4"></div>
                                    <div className="col-8"><button className="btn btn-primary" type="submit">Login</button></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>

        <footer>
            <div className="container">
                <div className="text-center py-4 text-muted">
                    Copyright &copy; 2024 - Web Tech ID
                </div>
            </div>
        </footer>
    </div>
    );
}

export default Login;