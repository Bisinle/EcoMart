import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Lottie from "lottie-web";
import banner from "../assets/banner.json";

function Header() {
  const container = useRef();
  const [animationLoaded, setAnimationLoaded] = useState(false);

  useEffect(() => {
    const anim = Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: banner,
    });

    anim.addEventListener("DOMLoaded", () => {
      setAnimationLoaded(true);
    });

    return () => {
      // Clean up the animation when the component unmounts
      anim.destroy();
    };
  }, []);

  return (
    <section className="w-screen py-12 md:flex md:justify-center md:items-center">
      <div className="md:w-1/2 px-4">
        <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-800 mb-4">
          WELCOME TO TRADE where all your desires come to life
        </h1>
        <p className="text-gray-600 text-lg md:text-xl my-10">
          Discover a world of limitless possibilities at Trade, your go-to
          online market. We bring you a curated selection of high-quality
          products, from the latest tech gadgets to stylish fashion and home
          essentials.
        </p>
        <NavLink
          to={"/contacts"}
          className="px-6 py-2 mx-3 my-10  text-lg md:text-2xl text-white bg-purple-700 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        >
          ContacUs
        </NavLink>
      </div>
      <div
        className={`md:w-100 ${animationLoaded ? "" : "hidden"} `}
        ref={container}
      ></div>
    </section>
  );
}

export default Header;
