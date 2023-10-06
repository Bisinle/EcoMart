import React from "react";
import { useAppContext } from "../MyContext";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { BsPerson, BsCart3, BsFillBookmarkHeartFill } from "react-icons/bs";
import Cart from "./Cart";
import Login from "./Login";
import Protexted from "./Protexted";
function Navbar() {
  const { isLogedin, setIsLogedin, cartCount, wishlistCount } = useAppContext();

  const [showCart, setShowCart] = useState(false);

  const linkText = isLogedin ? "Logout" : "Login";

  const handleLogout = () => {
    setIsLogedin(false);
    localStorage.clear("token");
  };

  return (
    <div>
      <nav className="flex flex-wrap items-center gap-2 w-full justify-between py-3 mb-[3rem] px-4 shadow-lg rounded-md">
        <h1 className="text-3xl font-bold">TRADE</h1>
        <div className="flex gap-8">
          <NavLink to={"/"} className={"nav-blocks relative"}>
            Home
          </NavLink>
          <NavLink to={"/about"}>About</NavLink>
          <NavLink to={"/contacts"}>Contacts</NavLink>
          <NavLink to={"/v-dash"}>V-dash</NavLink>
          <ul className="flex gap-8">
            
            <NavLink to="/wishlist">
              <li className="nav-blocks relative">
                {wishlistCount.length > 0 && (
                  <span className="navbar-badge">{wishlistCount.length}</span>
                )}
                <BsFillBookmarkHeartFill className="nav-icons" />
              </li>
            </NavLink>

            <NavLink to="/profile">
              <BsPerson className="nav-icons" />
            </NavLink>
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
          <NavLink to="/login" onClick={isLogedin ? handleLogout : null}>
            {linkText}
          </NavLink>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
      {/* <main>{isLogedin ? <Outlet /> : <Login />}</main> */}
    </div>
  );
}

export default Navbar;
