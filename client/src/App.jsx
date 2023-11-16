import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
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
import DashBoard from "./components/DashBoard";

import { useAuth } from "./auth";

function App() {
  const { isLogedin } = useAppContext();
  const { authState, onUpdateToken, login } = useAuth();

  useEffect(() => {
    if (authState) {
      onUpdateToken().then((newAcessToken) => {
        authState.access_token = newAcessToken;
        login(newAcessToken);
      });
    }
  }, [authState, onUpdateToken]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/dash_board" element={<DashBoard />} />
        <Route
          path="/v-dash"
          element={
            <Protexted isLogedin={isLogedin}>
              <VendorDashboard />
            </Protexted>
          }
        />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="login" element={<Login />} />
        {/* <Route path="logout" element={<Logout />} /> */}
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
