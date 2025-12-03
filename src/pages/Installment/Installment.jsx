import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Installment() {
  const [carsData, setCarsData] = useState(null);
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/installment_cars",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setCarsData(response.data);
    };

    const fetchUser = async () => {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/auth/user",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUser(response.data);
    };

    fetchCars();
    fetchUser();
  }, []);

  
  return (
    <div>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
        <div class="container">
          <a class="navbar-brand" href="#">
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
                  { user.name }
                </a>
              </li>
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
            <h1 class="display-4">Cars</h1>
          </div>
        </header>

        <div class="container mb-5">
          <div class="section-header mb-4">
            <h4 class="section-title text-muted font-weight-normal">
              List of Cars
            </h4>
          </div>

        { carsData && carsData.map((car) => (
          <div class="section-body" key={car.id}>
            <article class="spot">
              <div class="row">
                <div class="col-5">
                  <h5 class="text-primary">{ car.cars }</h5>
                  <span class="text-muted">{ car.description }</span>
                </div>
                <div class="col-4">
                  <h5>Available Month</h5>
                  <span class="text-muted">
                    { car.available_months.month } Months
                  </span>
                </div>
                <div class="col-3">
                  <button onClick={e => navigate(`/dashboard/installment-show/${car.id}`)} class="btn btn-danger btn-lg btn-block">
                    Detail
                  </button>
                </div>
              </div>
            </article>
          </div>
        ))};
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

export default Installment;
