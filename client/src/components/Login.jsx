import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate, json } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../MyContext";
// import { useAppContext } from "../MyContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setIsLogedin, jwtToken, setJwtToken } = useAppContext();
  const navigate = useNavigate();
  // const { setGlobalvariable } = useContext(useAppContext);
  // console.log(globalvariable);

  function handleLogin(e) {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    const base_url = "https://ecomart-x0ur.onrender.com/login";
    fetch(base_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("-------------response was not ok------------------");
        }
        return res.json();
      })
      .then((response) => {
        // console.log(response);
        const token = response.access_token;
        if (token) {
          console.log(response);
          localStorage.setItem("access_token", response.access_token);
          localStorage.setItem("refresh_token", response.refresh_token);
          localStorage.setItem("user_id", response.user_id);
          localStorage.setItem("user_name", response.user_name);
          localStorage.setItem("user_role", response.user_role);
        }

        token ? setIsLogedin(true) : setIsLogedin(false);
        setJwtToken(localStorage.getItem("access_token"));
        jwtToken === "" ? navigate("/login") : navigate("/");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }
  console.log(jwtToken);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2">username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
      <div className="mt-4">
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
