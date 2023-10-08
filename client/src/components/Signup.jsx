import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../MyContext";

const SignUp = () => {
  const { isLogedin, setIsLogedin, jwtToken, setJwtToken } = useAppContext();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState({});
  const [error, setError] = useState(null);
  const [FormObject, setFormObject] = useState({
    user_name: "",
    profile_picture: "",
    password: "",
    roles: "",
  });

  function formObjectCreator(e) {
    const { name, value } = e.target;
    setFormObject((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleSignUp(e) {
    e.preventDefault();

    const data = {
      user_name: FormObject.user_name,
      profile_picture: FormObject.profile_picture,
      password: FormObject.password,
      roles: FormObject.roles,
    };

    fetch(`https://ecomart-x0ur.onrender.com/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((response) => {
        console.log(response); // Handle the successful response here
        navigate("/login");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  // console.log(vendor);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block mb-2">username:</label>
            <input
              type="text"
              value={FormObject.user_name}
              onChange={formObjectCreator}
              className="w-full p-2 border rounded"
              placeholder="user_name"
              name="user_name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">profile_picture:</label>
            <input
              type="text"
              value={FormObject.profile_picture}
              onChange={formObjectCreator}
              name="profile_picture"
              className="w-full p-2 border rounded"
              placeholder="image"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">password:</label>
            <input
              type="password"
              value={FormObject.password}
              onChange={formObjectCreator}
              name="password"
              className="w-full p-2 border rounded"
              placeholder="password"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">roles:</label>
            <input
              type="roles"
              value={FormObject.roles}
              placeholder="roles"
              onChange={formObjectCreator}
              className="w-full p-2 border rounded"
              required
              name="roles"
            />
          </div>
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Sign Up
          </button>
        </form>
      </div>
      <div className="mt-4">
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
