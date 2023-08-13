import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Validation from "./validation/SignupValidationA";

const SignupDonor = () => {

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate()

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors(Validation(values))
    if(errors.name === "" && errors.name=== "" && errors.password === "") { //if errors are empty(not there)
      axios.post('http://localhost:8081/signupdonor', values)
      .then(res => navigate('/donorhome'))
      .catch(err => console.log(err))
    } 
  }


  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-3 rounded w-25 border loginForm">
        {/* <div className="text-danger fw-bold">{error && error}</div> */}

        <h2>SIGNUP DONOR</h2>
        <form action="" onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="name">
              <b>Name</b>
            </label>
            <input
            onChange={handleInput}
              type="text"
              placeholder="Enter Name"
              name="name"
              className="form-control rounded-0"
            />
            {errors.name && <span className='text-danger'>{errors.name}</span> }
          </div>

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
            Sign Up
          </button>
          Already have an account? <Link to='/logindonor'>Log In</Link>
        </form>
      </div>
    </div>
  );
};

export default SignupDonor;
