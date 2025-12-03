import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function CreateValidation() {
  const [job, setJob] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [income, setIncome] = useState("");
  const [reason, setReason] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/v1/validation",
        {
          job: job,
          job_description: jobDescription,
          income: income,
          reason_accepted: reason,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status != 200) setError(response.data.message);

      setMessage("Validation request sent successfully");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
        <div class="container">
          <a class="navbar-brand" href="/dashboard">
            Installment Cars
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExampleDefault"
            aria-controls="navbarsExampleDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <header class="jumbotron">
          <div class="container">
            <h1 class="display-4">Request Data Validation</h1>
          </div>
        </header>

        {error && <div class="alert alert-danger">{error}</div>}
        {message && <div class="alert alert-success">{message}</div>}

        <div class="container">
          <form onSubmit={handleCreate}>
            <div class="row mb-4">
              <div class="col-md-6">
                <div class="form-group">
                  <div class="d-flex align-items-center mb-3">
                    <label class="mr-3 mb-0">Are you working?</label>
                    <select class="form-control-sm">
                      <option value="yes">Yes, I have</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    placeholder="Your Job"
                    class="form-control mt-2 mb-2"
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                  ></input>
                  <textarea
                    class="form-control"
                    cols="30"
                    rows="5"
                    placeholder="describe what you do in your job"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  ></textarea>
                  <input
                    type="number"
                    placeholder="Income (Rp)"
                    class="form-control mt-2"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                  ></input>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-group">
                  <div class="d-flex align-items-center mb-3">
                    <label class="mr-3 mb-0">Reason Accepted</label>
                  </div>
                  <textarea
                    class="form-control"
                    cols="30"
                    rows="6"
                    placeholder="Explain why you should be accepted"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>

            <button class="btn btn-primary" type="submit">
              Send Request
            </button>
          </form>
        </div>
      </main>
      <footer>
        <div class="container">
          <div class="text-center py-4 text-muted">
            Copyright &copy; 2024 - Web Tech ID
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CreateValidation;
