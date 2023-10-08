import { Route, Router, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppContext } from "./MyContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Contacts from "./components/Contacts";
import Wishlist from "./components/WishList";
import { ToastContainer } from "react-toastify";
import Logout from "./components/Logout";
import Protexted from "./components/Protexted";
import Profile from "./components/Profile";
import VendorDashboard from "./components/vendor";

function App() {
  const { isLogedin, setIsLogedin } = useAppContext();

  useEffect(() => {
    console.log("refresh_Token: ", localStorage.refresh_token);
    setInterval(() => {
      if (localStorage.refresh_token) {
        fetch("http://127.0.0.1:5555/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh_token: localStorage.getItem("refresh_token")
              ? JSON.parse(localStorage.getItem("refresh_token"))
              : null,
          }),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(
                "-------------response was not ok------------------"
              );
            }
            return res.json();
          })
          .then((data) => {
            console.log(data);
          });
      }
    }, 1000);
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route
          path="/v-dash"
          element={
            <Protexted isLogedin={isLogedin}>
              <VendorDashboard />
            </Protexted>
          }
        />
        <Route
          path="/profile"
          element={
            <Protexted isLogedin={isLogedin}>
              <Profile />
            </Protexted>
          }
        />
        <Route
          path="/wishlist"
          element={
            <Protexted isLogedin={isLogedin}>
              <Wishlist />
            </Protexted>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
      <Footer />
      <ToastContainer />
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
