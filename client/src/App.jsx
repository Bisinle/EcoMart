import { Route, Router, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Contacts from "./components/Contacts";
import Wishlist from "./components/WishList";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="About" element={<About />} />
        <Route path="about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        {/* <Route
          path="OrderSummary"
          element={<OrderSummary UserObject={User} />}
        />
        <Route
          path="OrderForm"
          element={<OrderForm givMeObject={ObjectReceiver} />}
        /> */}
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
