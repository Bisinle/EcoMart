import React from "react";
import { useAppContext } from "../MyContext";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { BsPerson, BsCart3, BsFillBookmarkHeartFill } from "react-icons/bs";
import Cart from "./Cart";

function Navbar({ globalvariable }) {
  const [loginLogoutBtn, setLoginLogoutBtn] = useState(false);
  const linkText = loginLogoutBtn ? "logout" : "login";

  const { cartCount, wishlistCount } = useAppContext();
  const [showCart, setShowCart] = useState(false);

  function logout(e) {
    setLoginLogoutBtn(!loginLogoutBtn);
    localStorage.clear("token");
  }

  return (
    <div>
      <nav className="flex flex-wrap items-center gap-2  w-full justify-between py-3  mb-[3rem] px-4 shadow-lg rounded-md">
        <h1 className="text-3xl font-bold">TRADE</h1>
        <div className="flex gap-8  ">
          <NavLink to={"/"} className={"nav-blocks relative"}>
            Home
          </NavLink>
          <NavLink to={"/about"}>About</NavLink>
          <NavLink to={"/contacts"}>Contacs</NavLink>

          <ul className="flex gap-8">
            <li className="nav-blocks relative">
              {wishlistCount.length > 0 && (
                <span className="navbar-badge">{wishlistCount.length}</span>
              )}
              <BsFillBookmarkHeartFill className="nav-icons" />
            </li>
            <li className="nav-blocks">
              <BsPerson className="nav-icons" />
            </li>

            <li className="nav-blocks relative">
              {cartCount.length > 0 && (
                <span className="navbar-badge">{cartCount.length}</span>
              )}
              <button onClick={() => setShowCart(true)}>
                <BsCart3 className="nav-icons" />
              </button>

              <Cart showCart={showCart} setShowCart={setShowCart} />
            </li>
          </ul>

          <NavLink to={"/logout"} onClick={logout}>
            Logout
          </NavLink>
        </div>
      </nav>
      <main>{<Outlet />}</main>
    </div>
  );
}

export default Navbar;
