import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css"
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/ApiRoutes";

export default function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({ username: "", password: "" });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };


  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const response = await axios.post(loginRoute, {
        username,
        password,
      });
      if (response.data.status === false) {
        toast.error(response.data.message, toastOptions);
      }

      if (response.data.status === true) {

        localStorage.setItem("chat-app-user", JSON.stringify(response.data.usernameCheck));
        toast.info("Redirecting...", toastOptions);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
      // if (response.data.status === true) {
      //   navigate("/setAvATAR");
      // }
    }
  };

  return (
    <>
      <div className="formContainer">
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>chatter</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

