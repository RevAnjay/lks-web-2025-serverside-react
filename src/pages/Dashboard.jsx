import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const location = useLocation();
  const message = location.state?.message || "";
  const user = location.state?.user || "";
  const [error, setError] = useState("");
  const [validationData, setValidationData] = useState(null);
  const [applicationsData, setApplicationsData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
      if (!localStorage.getItem("token")) {
        navigate("/", { replace: true });
      }
      
      const fetchValidations = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/v1/validations",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              }
            }
          )

          setValidationData(response.data);
        } catch (err) {
          setError(err.message);
        }
      };

      const fetchApplications = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/v1/applications",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              }
            }
          )

          setApplicationsData(response.data);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchValidations();
      fetchApplications();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.status != "success") {
        setError(response.data.message);
      }

      localStorage.removeItem("token");
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
        <div className="container">
          <a className="navbar-brand" href="#">
            Installment Cars
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExampleDefault"
            aria-controls="navbarsExampleDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  { user.name }
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={(e) => {e.preventDefault(); handleLogout();}}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <header className="jumbotron">
          <div className="container">
            <h1 className="display-4">Dashboard</h1>
          </div>
        </header>

        <div className="container">
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <section className="validation-section mb-5">
            <div className="section-header mb-3">
              <h4 className="section-title text-muted">My Data Validation</h4>
            </div>
            
            <div className="row">
              <div className="col-md-4">
                <div className="card card-default">
                  <div className="card-header">
                    <h5 className="mb-0">Data Validation</h5>
                  </div>
                  <div className="card-body">
                    <a href="/dashboard/validation" className="btn btn-primary btn-block">
                      + Request validation
                    </a>
                  </div>
                </div>
              </div>
              { validationData && validationData.map((validation) => (
              <div  className="col-md-4">
                <div className="card card-default">
                  <div className="card-header border-0">
                    <h5 className="mb-0">Data Validation</h5>
                  </div>
                  <div className="card-body p-0">
                    <table className="table table-striped mb-0">
                      <tbody>
                        <tr>
                          <th>Status</th>
                          <td>
                            <span className="badge badge-info">{ validation.status }</span>
                          </td>
                        </tr>
                        <tr>
                          <th>Job</th>
                          <td className="text-muted">{ validation.job }</td>
                        </tr>
                        <tr>
                          <th>Income/Month</th>
                          <td className="text-muted">{ validation.income }</td>
                        </tr>
                        <tr>
                          <th>Validator</th>
                          <td className="text-muted">{ validation.validator_id }</td>
                        </tr>
                        <tr>
                          <th>Validator Notes</th>
                          <td className="text-muted">{ validation.validator_notes }</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )) }
            </div>
          </section>
          <section className="validation-section mb-5">
            <div className="section-header mb-3">
              <div className="row">
                <div className="col-md-8">
                  <h4 className="section-title text-muted">
                    My Installment Cars
                  </h4>
                </div>
                <div className="col-md-4">
                  <a href="" className="btn btn-primary btn-lg btn-block">
                    + Add Installment Cars
                  </a>
                </div>
              </div>
            </div>
            <div className="section-body">
              <div className="row mb-4">
                <div className="col-md-12">
                  <div className="alert alert-warning">
                    Your validation must be approved by validator to Installment
                    Cars.
                  </div>
                </div>
                { applicationsData && applicationsData.map((application) => (
                <div className="col-md-6">
                  <div className="card card-default">
                    <div className="card-header border-0">
                      <h5 className="mb-0">{ application.name }</h5>
                    </div>
                    <div className="card-body p-0">
                      <table className="table table-striped mb-0">
                        <tbody>
                          <tr>
                            <th>Description</th>
                            <td className="text-muted">
                              { application.description }
                            </td>
                          </tr>
                          <tr>
                            <th>Price</th>
                            <td className="text-muted">Rp. { application.price }</td>
                          </tr>
                          <tr>
                            <th>Installment</th>
                            <td className="text-muted">
                              { application.months } Months{" "}
                              <span className="badge badge-info">Pending</span>
                            </td>
                          </tr>
                          <tr>
                            <th>Apply Date</th>
                            <td className="text-muted">{ application.apply_date }</td>
                          </tr>
                          <tr>
                            <th>Notes</th>
                            <td className="text-muted">
                              { application.notes }
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            </div>
          </section>
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

export default Dashboard;
