import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Validation from "./validation/LoginValidationA";

const LoginDonor = () => {

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  axios.defaults.withCredentials = true
  const navigate = useNavigate(); //for navigating between routes
  
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("helllo")
    setErrors(Validation(values))
    // if(errors.name=== "" && errors.password === "") { //if errors are empty(not there)
      
      axios.post('http://localhost:8081/logindonor', values)
      .then(res => {
      
        if(res.data.Status === "Success for logging") {
          navigate("/donorhome")
        } else {
          console.log("errrrorrrrrrrrrrrrrr")
          setErrors(res.data.Error)
          alert("User does not exist")

        }
       })
      .catch(err => console.log(err))
  //}
  };



  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-3 rounded w-25 border loginForm">
        {/* <div className="text-danger fw-bold">{error && error}</div> */}

        <h2>LOGIN DONOR</h2>
        <form action="" onSubmit={handleSubmit}>
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
            {errors.email && <span className='text-danger'>{errors.email}</span> }
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
            {errors.password && <span className='text-danger'>{errors.password}</span> }
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-0">
            Log In
          </button>
          Don't have an account?
          <Link to="/signupdonor"> Sign Up as a Donor!</Link>
        </form>
      </div>
    </div>
  );
};

export default LoginDonor;
