import React from "react";
import { useAppContext } from "../MyContext";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { BsPerson, BsCart3, BsFillBookmarkHeartFill } from "react-icons/bs";
import Cart from "./Cart";
import UserMenu from "./UserMenu";
import { useAuth } from "../auth";

const LoggedOutLinks = () => {
  return (
    <>
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
        className="bg-indigo-500 text-white font-bold text-black mx-3 p-2  rounded-lg"
      >
        Login
      </NavLink>
    </>
  );
};

const LoggedInLinks = () => {
  const [showCart, setShowCart] = useState(false);
  const { cartCount, wishlistCount } = useAppContext();

  return (
    <>
      <NavLink
        to={"/"}
        className="bg-indigo-500 text-white mx-3 p-2 font-bold  rounded-lg"
      >
        Home
      </NavLink>
      <NavLink
        to={"/about"}
        className="hover:bg-indigo-500 hover:text-white mx-3 p-2  rounded-lg"
      >
        About
      </NavLink>
      <NavLink
        to={"/contacts"}
        className="hover:bg-indigo-500 hover:text-white mx-3 p-2  rounded-lg"
      >
        Contacts
      </NavLink>
      <NavLink
        to="/wishlist"
        className="hover:bg-indigo-500 hover:text-white mx-3 p-2  rounded-lg"
      >
        <li className="nav-blocks relative">
          {wishlistCount.length > 0 && (
            <span className="navbar-badge">{wishlistCount.length}</span>
          )}
          <BsFillBookmarkHeartFill className="nav-icons  hover:bg-indigo-500 hover:text-white  rounded-lg" />
        </li>
      </NavLink>
      {/* <NavLink to="/profile">
        <BsPerson className=" nav-icons hover:bg-indigo-500 hover:text-white  mx-3   items-center  rounded-lg" />
      </NavLink> */}
      <li className="nav-blocks relative">
        {cartCount.length > 0 && (
          <span className="navbar-badge">{cartCount.length}</span>
        )}
        <button onClick={() => setShowCart(true)}>
          <BsCart3 className="nav-icons hover:bg-indigo-500 hover:text-white mx-3 rounded-lg" />
        </button>
        <Cart showCart={showCart} setShowCart={setShowCart} />
      </li>
      <li>
        <UserMenu />
      </li>
    </>
  );
};

function Navbar() {
  const [logged] = useAuth();
  // console.log(logged);

  return (
    <div>
      <nav className="flex flex-wrap items-center gap-2 w-full justify-between py-3 mb-[3rem] px-4 shadow-lg rounded-md">
        <h1 className="text-3xl font-bold">
          <span className="text-indigo-500">TRADE</span>
        </h1>
        <div className="flex gap-8">
          <ul className="flex gap-8 flex items-center flex-wrap">
            {logged ? <LoggedInLinks /> : <LoggedOutLinks />}
          </ul>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Navbar;
