import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../MyContext";
import { useForm } from "react-hook-form";
import { login } from "../auth";

const Login = () => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState(null);
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // console.log(watch("username"));
  // console.log(watch("password"));
  const { setIsLogedin, jwtToken, setJwtToken, setUserId } = useAppContext();
  const navigate = useNavigate();
  // const { setGlobalvariable } = useContext(useAppContext);
  // console.log(globalvariable);

  function loginUser(data) {
    // console.log(data);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("http://127.0.0.1:5555/auth/login", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.access_token);
        login(data.access_token);
        data.access_token && navigate("/");
        data.access_token ? setIsLogedin(true) : setIsLogedin(false);
      });
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-2">username:</label>
            <input
              type="text"
              {...register("username", { required: true, maxLength: 25 })}
              className="w-full p-2 border rounded"
            />
            {errors.username && (
              <p style={{ color: "red" }}>
                {" "}
                <small>username is required</small>{" "}
              </p>
            )}
            {errors.username?.type === "maxLength" && (
              <p style={{ color: "red" }}>
                {" "}
                <small>should have max 25 characters</small>{" "}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password:</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 2 })}
              className="w-full p-2 border rounded"
            />
            {errors.password && (
              <p style={{ color: "red" }}>
                <small>password is required</small>
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p style={{ color: "red" }}>
                {" "}
                <small>should have min 2 characters</small>{" "}
              </p>
            )}
          </div>
          <button
            onClick={handleSubmit(loginUser)}
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
