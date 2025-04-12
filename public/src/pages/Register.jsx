import React, { useState, useEffect } from 'react';
import './Register.css'
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/ApiRoutes";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassoword: ""
  })

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;
      const response = await axios.post(registerRoute, {
        username: username,
        email: email,
        password: password
      })


      if (response.data.status === false) {
        toast.error(
          response.data.message,
          toastOptions
        );
      }

      if (response.data.status === true) {

        localStorage.setItem("chat-app-user", JSON.stringify(response.data.userDbResponse));
        toast.info("Redirecting...", toastOptions);

        setTimeout(() => {
          navigate("/");
        }, 2000);
        // setTimeout(() => {
        //   navigate("/setAvATAR");
        // }, 2000);
      }
    }
  };


  const handleValidation = () => {
    const { password, confirmPassoword, username, email } = values;

    if (password !== confirmPassoword) {
      toast.error(
        "Password does not matched!!",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 6) {
      toast.error(
        "Password should greater than 6 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }


  return (
    <>
      < div className='formContainer'>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className='brand'>
            <img src={logo} alt="logo" />
            <h1>Chatter</h1>
          </div>
          <input type="text" name="username" placeholder='Username' onChange={(event) => handleChange(event)} />
          <input type="email" name="email" placeholder='Email' onChange={(event) => handleChange(event)} />
          <input type="password" name="password" placeholder='Password' onChange={(event) => handleChange(event)} />
          <input type="text" name="confirmPassoword" placeholder='Confirm password' onChange={(event) => handleChange(event)} />
          <button type='submit'>Register</button>
          <span>Already have an account? <Link to={"/login"}>Login</Link></span>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}



export default Register;