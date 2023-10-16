import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../MyContext";
import { FiMenu } from "react-icons/fi";
import Logout from "./Logout";
import { logout } from "../auth";
import { BsPerson } from "react-icons/bs";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setUserRole, setIsLogedin } = useAppContext();
  const navigate = useNavigate();
  const userName = localStorage.getItem("user_name");

  const handleLogout = () => {
    setUserRole(null);
    setIsLogedin(false);
    localStorage.clear();
    logout();
    navigate("/");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ display: "flex", alignItems: "center" }}
      >
        <span>{userName}</span>

        <img
          src={localStorage.getItem("user_profile_pic")}
          className=" nav-icons h-10 w-10 hover:bg-indigo-500 hover:text-white mx-3 items-center rounded-2xl "
        />
        {/* Add the hamburger icon */}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg z-10"
          style={{ backdropFilter: "blur(10px)" }}
        >
          <div className="py-1">
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile
            </Link>
          </div>
          <div className="py-1">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
