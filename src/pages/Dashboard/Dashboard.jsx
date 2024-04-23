import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Dashboard</div>
            <div className="card-body">
              <p>You are logged in!</p>
            </div>
            <div className="card-body">
              <Link to="/" className="btn btn-primary">Crear oferta</Link>
            </div>
            <div className="card-body">
              <Link to="/" className="btn btn-primary">Pagar</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
