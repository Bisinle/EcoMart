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
    // reset();
    // e.preventDefault();
    // const data = {
    //   username: username,
    //   password: password,
    // };
    // const base_url = "http://127.0.0.1:5555/auth/login";
    // fetch(base_url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error("-------------response was not ok------------------");
    //     }
    //     return res.json();
    //   })
    //   .then((response) => {
    //     // console.log(response);
    //     const token = response.access_token;
    //     if (token) {
    //       console.log(response);
    //       localStorage.setItem("access_token", response.access_token);
    //       localStorage.setItem("refresh_token", response.refresh_token);
    //       localStorage.setItem("user_id", response.user_id);
    //       localStorage.setItem("user_name", response.user_name);
    //       localStorage.setItem("user_role", response.user_role);
    //       localStorage.setItem(
    //         "user_profile_piture",
    //         response.user_profile_picture
    //       );
    //     }

    //     token ? setIsLogedin(true) : setIsLogedin(false);
    //     setJwtToken(localStorage.getItem("access_token"));
    //     setUserId(response.user_id);
    //     jwtToken === "" ? navigate("/login") : navigate("/");
    //   })
    //   .catch((error) => {
    //     console.error("There was a problem with the fetch operation:", error);
    //   });
  }
  // console.log(jwtToken);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-2">username:</label>
            <input
              type="text"
              // value={username}
              // onChange={(e) => setUsername(e.target.value)}
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
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
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
