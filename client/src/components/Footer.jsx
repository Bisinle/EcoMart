import React, { useState } from "react";
import { about } from "../MyContext";
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
    <footer className="mt-[2rem] text-[.95rem] mx-2 py-10 rounded-md">
      <ul className="flex items-start justify-around  pb-5">
        <li className="footer-li">
          <span className="foot-head">Ecomm</span>
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
          <ul className="map-ul">
            {about.map((item) => (
              <li
                key={item}
                className="hover:text-indigo-500 hover:font-semibold pb-2"
              >
                {item}
              </li>
            ))}
          </ul>
        </li>
        <li className="footer-li flex flex-col gap-y-[1rem]">
          <div className="w-[22rem]">
            <p className="mb-4 foot-head">SIGNUP & SAVE</p>
            <p>
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2 py-3">
              <input
                className="border-b-2 border-black py-1 outline-none "
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                // required
              />
              <button
                type="submit"
                className="border-2 border-black p-2
                 hover:bg-black hover:text-white 
                 transition-all ease-in-out duration-300
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
