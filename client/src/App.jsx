import { Route, Router, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useAppContext } from "./MyContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Contacts from "./components/Contacts";
import Logout from "./components/Logout";

function App() {
  const [globalvariable, setGlobalvariable] = useState("");
  useEffect(() => {
    setGlobalvariable(localStorage.getItem("token"));
  }, []);

  return (
    <div className="App">
      <Navbar token={globalvariable} />

      <Routes element={globalvariable ? <Logout /> : <Login />}>
        <Route path="/" element={<Home />} />
        <Route path="About" element={<About />} />
        <Route path="about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="signup" element={<Signup />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

// return (
//   // <>
//   //   <Navbar />
//   //
//   //
//   // </>

// )
