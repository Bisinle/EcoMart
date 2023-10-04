import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { BsPerson, BsCart3, BsFillBookmarkHeartFill } from "react-icons/bs";
import App from "../App";
import Cart from "./Cart";
import { useAppContext } from "../MyContext";

function Navbar() {
  const { cartCount, wishlistCount } = useAppContext();
  const [showCart, setShowCart] = useState(false);

  return (
    <nav className="flex items-center gap-2 justify-between py-3 mb-[3rem] px-4 shadow-lg rounded-md">
      <h1 className="text-3xl font-bold">TRADE</h1>

      <ul className="flex gap-8">
        <li className="nav-blocks relative">
          {wishlistCount.length > 0 && (
            <span className="navbar-badge">{wishlistCount.length}</span>
          )}
          <BsFillBookmarkHeartFill className="nav-icons" />
          <p>Wishlist</p>
        </li>
        <li className="nav-blocks">
          <BsPerson className="nav-icons" />
          <p>Account</p>
        </li>

        <li className="nav-blocks relative">
          {cartCount.length > 0 && (
            <span className="navbar-badge">{cartCount.length}</span>
          )}
          <button onClick={() => setShowCart(true)}>
            <BsCart3 className="nav-icons" />
          </button>
          <p>Cart</p>
          <Cart showCart={showCart} setShowCart={setShowCart} />
        </li>
      </ul>

      <ul className="flex items-center gap-4">
        <li className="cursor-pointer">About us</li>
        <li className="cursor-pointer">Contact us</li>
      </ul>
      {/* <Routes>
        <Route path="/" element={<App />} />
        <Route path="/account" />
        <Route path="/cart" />
      </Routes> */}
    </nav>
  );
}

export default Navbar;
