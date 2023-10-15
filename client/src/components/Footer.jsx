import React, { useState } from "react";
import { about } from "../MyContext";
import { NavLink } from "react-router-dom";
import {
  FaInstagram,
  FaSquareXTwitter,
  FaPinterest,
  FaSquareFacebook,
} from "react-icons/fa6";

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <footer className="mt-[2rem] text-[.95rem] mx-2 py-10 rounded-md flex flex-wrap flex-col">
      <ul className="flex items-start justify-around flex flex-wrap flex-col-1  pb-5">
        <li className="footer-li items-center">
          <span className="foot-head">
            <span className="text-indigo-500">TRADE</span>
          </span>
          <div className="w-[22rem] pt-4">
            <p>
              At Ecomm, our mission is to revolutionize the way you shop online.
              We aim to provide a seamless and delightful shopping experience,
              offering a curated selection of products that combine quality,
              style, and affordability.
            </p>
          </div>
        </li>

        <li className="footer-li">
          <span className="foot-head">Quick Links</span>
          <ul className="map-ul flex flex-wrap flex-col items-center basis-full">
            <NavLink
              to={"/"}
              className="hover:bg-indigo-500 hover:text-white text-black mx-3 p-2  rounded-lg"
            >
              Home
            </NavLink>
            <NavLink
              to={"/about"}
              className="hover:bg-indigo-500 hover:text-white text-black mx-3 p-2  rounded-lg"
            >
              About
            </NavLink>
            <NavLink
              to={"/contacts"}
              className="hover:bg-indigo-500 hover:text-white text-black mx-3 p-2  rounded-lg"
            >
              Contacts
            </NavLink>
            <NavLink
              to={"/login"}
              className="hover:bg-indigo-500 hover:text-white text-black mx-3 p-2  rounded-lg"
            >
              Login
            </NavLink>
          </ul>
        </li>
        <li className="footer-li flex flex-col gap-y-[1rem]">
          <div className="w-[22rem]">
            <form
              onSubmit={handleSubmit}
              className="flex flex-wrap  items-center gap-2 py-3"
            >
              <input
                className="border-b-2 border-black py-1 outline-none basis-full "
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter Email"
                // required
              />
              <button
                type="submit"
                className="border-2 border-black p-2
                bg-black text-white font-medium
                 hover:bg-white hover:text-black 
                 transition-all ease-in-out duration-300 basis-full mt-3
                 "
              >
                Subscribe
              </button>
            </form>
            <div className="flex gap-5">
              <FaInstagram className="nav-icons foot-icons" />
              <FaSquareXTwitter className="nav-icons foot-icons" />
              <FaPinterest className="nav-icons foot-icons" />
              <FaSquareFacebook className="nav-icons foot-icons" />
            </div>
          </div>
        </li>
      </ul>
      <hr />
      <small className="text-xs grid grid-cols-1 place-items-center pt-5">
        &#169; 2023 Ecomm All rights reserved.
      </small>
    </footer>
  );
}

export default Footer;
