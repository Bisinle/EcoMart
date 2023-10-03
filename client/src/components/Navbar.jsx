import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { BsPerson, BsCart3, BsFillBookmarkHeartFill } from "react-icons/bs";
import App from "../App";

function Navbar() {
  return (
    <nav className="flex items-center gap-2 justify-between py-3 mb-[3rem] px-4 shadow-lg rounded-md">
      <h1 className="text-3xl font-bold">TRADE</h1>

      <ul className="flex gap-8">
        <li className="nav-blocks">
          <BsFillBookmarkHeartFill className="nav-icons" />
          <p>Wishlist</p>
        </li>
        <li className="nav-blocks">
          <BsPerson className="nav-icons" />
          <p>Account</p>
        </li>

        <li className="nav-blocks">
          <BsCart3 className="nav-icons" />
          <p>Cart</p>
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
