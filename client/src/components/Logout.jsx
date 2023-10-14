import React from "react";
import { useNavigate } from "react-router-dom";
export default function Logout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear("token");
    navigate("/");
  };
  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
