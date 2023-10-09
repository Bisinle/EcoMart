import React from "react";

export default function Logout() {
  return <button onClick={localStorage.clear("token")}>Logout</button>;
}
