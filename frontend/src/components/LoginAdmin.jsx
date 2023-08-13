import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Validation from "./validation/LoginValidationA";

const LoginAdmin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate(); //for navigating between routes

  axios.defaults.withCredentials = true;

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("helllo")
    setErrors(Validation(values));
    // if(errors.name=== "" && errors.password === "") { //if errors are empty(not there)

    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8081/loginadmin", values)
        .then((res) => {
          if (res.data.Status === "Success for logging") {
            navigate("/");
          } else {
            alert("No record exists");
          }
        })
        .catch((err) => console.log(err));
    }

    // axios
    //   .post("http://localhost:8081/loginadmin", values)
    //   .then((res) => {
    //     if (res.data.Status === "Success for logging") {
    //       navigate("/");
    //     } else {
    //       console.log("errrrorrrrrrrrrrrrrr");
    //       setErrors(res.data.Error);
    //       alert("User does not exist");
    //     }
    //   })
    //   .catch((err) => console.log(err));
    //}
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-3 rounded w-25 border loginForm">
        {/* <div className="text-danger fw-bold">
  {Object.values(errors).map((error, index) => (
    <div key={index}>{error}</div>
  ))}
</div> */}

        <h2>LOGIN ADMIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              onChange={handleInput}
              type="email"
              placeholder="Enter Email"
              name="email"
              className="form-control rounded-0"
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              onChange={handleInput}
              type="password"
              placeholder="Enter password"
              name="password"
              className="form-control rounded-0"
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Log In
          </button>
          Don't have an account?
          <Link to="/signupadmin"> Sign Up as an Admin!</Link>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
