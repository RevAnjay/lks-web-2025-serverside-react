import { use, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function InstallmentShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [installmentData, setInstallmentData] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [months, setMonths] = useState("");
  const [notes, setNotes] = useState("");
  console.log(months);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/", { replace: true });
    }

    async function fetchInstallment() {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/installment_cars/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setInstallmentData(response.data);
    }

    const fetchUser = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/auth/user",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUser(response.data);
    };

    fetchInstallment();
    fetchUser();
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
        setMessage(null);
        setError(response.data.message);
      }

      localStorage.removeItem("token");
      navigate("/", { replace: true });
    } catch (err) {
      setMessage(null);
      setError(err.message);
    }
  };

  async function handleApply(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/applications",
        {
          installment_id: installmentData.id,
          months: months,
          notes: notes,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setError(null);
      setMessage("Installment application sent successfully");
    } catch (err) {
      setMessage(null);
      setError(err.message);
    }
  }

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
                  {user.name}
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <header class="jumbotron">
          {error && <div class="alert alert-danger">{error}</div>}
          {message && <div class="alert alert-success">{message}</div>}
          <div class="container text-center">
            <div>
              <h1 class="display-4">{installmentData.cars}</h1>
              <span class="text-muted">
                Brand : {installmentData.brand_name}
              </span>
            </div>
          </div>
        </header>

        <form class="container" onSubmit={handleApply}>
          <div class="row mb-3">
            <div class="col-md-12">
              <div class="form-group">
                <h3>Description</h3>
                {installmentData.description}
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
                <h3>
                  Price :{" "}
                  <span class="badge badge-primary">
                    Rp. {installmentData.price}
                  </span>
                </h3>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-12">
              <div class="form-group">
                <h3>Select Months</h3>
                <select
                  name="months"
                  class="form-control"
                  onChange={(e) => setMonths(parseInt(e.target.value))}
                  value={months}
                >
                  <option value="">-- Select Months --</option>
                  {installmentData.available_months &&
                    installmentData.available_months.map((month) => (
                      <option value={month.id} key={month.id}>
                        {month.month} Months
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
                <h3>
                  Nominal/Month :{" "}
                  <span class="badge badge-primary">
                    Rp. {installmentData.price}
                  </span>
                </h3>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <div class="d-flex align-items-center mb-3">
                  <label class="mr-3 mb-0">Notes</label>
                </div>
                <textarea
                  class="form-control"
                  cols="30"
                  rows="6"
                  placeholder="Explain why your installment should be approved"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
                <div class="d-flex align-items-center mb-3">
                  <button class="btn btn-primary btn-lg" type="submit">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
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

export default InstallmentShow;
