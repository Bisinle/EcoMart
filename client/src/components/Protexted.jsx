import React from "react";
import { Navigate } from "react-router-dom";

function Protexted({ isLogedin, children }) {
  if (!isLogedin) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default Protexted;
