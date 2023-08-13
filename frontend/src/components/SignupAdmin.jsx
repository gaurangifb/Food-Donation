import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Validation from "./validation/SignupValidationA";

const SignupAdmin = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  //const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate()

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   setErrors(Validation(values))
  //   if(errors.name === "" && errors.name=== "" && errors.password === "") { //if errors are empty(not there)
  //     axios.post('http://localhost:8081/signupadmin', values)
  //     .then(res => navigate('/'))
  //     .catch(err => console.log(err))
  //   } 
  // }

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(Validation(values))

    if(errors.name === "" && errors.email === "" && errors.password === "") {
      axios.post("http://localhost:8081/signupadmin", values)
      .then(res => navigate("/"))
      .catch(err => console.log(err))
    }
    // axios.post("http://localhost:8081/signupadmin", values)
    //   .then((res) => {
    //     if (res.data.Status === "success") {
    //       // Handle successful registration, e.g., redirect to dashboard
    //       navigate("/")
    //     } else {
    //       //setAlertMessage(res.data.Error); // Set alert message
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     //setAlertMessage("An error occurred during registration");
    //   });
  
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-3 rounded w-25 border">
        {/* <div className="text-danger fw-bold">{error && error}</div> */}

        {/* {alertMessage && <p>{alertMessage}</p>} */}
    
        <h2>SIGNUP ADMIN</h2>
        <form action="" onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="name">
              <b>Name</b>
            </label>
            <input
              name="name"
              onChange={handleInput}
              type="text"
              placeholder="Enter Name"
              className="form-control rounded-0"
            />
            {errors.name && <span className='text-danger'>{errors.name}</span> }
          </div>

          <div className="mb-3">
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              // onChange={(e) => setValues({ ...values, email: e.target.value })}
              name="email"
              onChange={handleInput}
              type="email"
              placeholder="Enter Email"
              className="form-control rounded-0"
            />
            {errors.email && <span className='text-danger'>{errors.email}</span> }
          </div>

          <div className="mb-3">
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              // onChange={(e) =>
              //   setValues({ ...values, password: e.target.value })
              // }
              name="password"
              onChange={handleInput}
              type="password"
              placeholder="Enter password"
              className="form-control rounded-0"
            />
          {errors.password && <span className='text-danger'>{errors.password}</span> }
        </div>

          <button type="submit" className="btn btn-success w-100 rounded-0">
            Sign Up
          </button>
          Already have an account? <Link to='/loginadmin'>Log In</Link>
        </form>
      </div>
    </div>
  );
};

export default SignupAdmin;
