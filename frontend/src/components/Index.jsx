import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Index = () => {
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
        <div className="p-3 rounded w-25 border text-center">
          <h2>Login As</h2>
          <div className="d-flex justify-content-between mt-5">
            <Link to="/loginadmin" className="btn btn-primary btn-lg">
              ADMIN
            </Link>
            <Link to="/logindonor" className="btn btn-success border btn-lg">
              DONOR
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
