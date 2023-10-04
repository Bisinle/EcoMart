import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login";  // Corrected import path
import SignUp from "./components/signup";  // Corrected import path
import VendorDashboard from "./components/vendor";  // Corrected import path

function App() {
  return (
    <Router>
      <div>
        {/* Navigation, header, or any other top-level components can be placed here */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          {/* Add more routes for other components as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
