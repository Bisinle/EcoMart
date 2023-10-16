import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { NavLink } from "react-router-dom";
import Lottie from "lottie-web";
import banner from "../assets/banner.json";

function Header() {
  const container = useRef();
  const [animationLoaded, setAnimationLoaded] = useState(false);

  useEffect(() => {
    AOS.init();
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
    <section className="py-10 " data-aos="fade-up" data-aos-duration="500">
      <div className="container bold flex flex-wrap  justify-center  mt-10 md:px-2 md:flex-row">
        <div className="mb-14 lg:mb-0 lg:w-1/2  ">
          <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-800 mb-4">
            WELCOME TO TRADE where all your desires come to life
          </h1>
          <p className="text-gray-600 text-md md:text-xl my-10  ">
            Discover a world of limitless possibilities at Trade, your go-to
            online market. We bring you a curated selection of high-quality
            products, from the latest tech gadgets to stylish fashion and home
            essentials.
          </p>
          <NavLink
            to={"/contacts"}
            className="text-white bg-indigo-600 font-medium rounded-lg px-5 py-4 text-center hover:bg-indigo-800 hover:drop-shadow-md transition duration-300 ease-in-out"
          >
            ContacUs
          </NavLink>
        </div>

        <div
          className={` mx-0 ${animationLoaded ? "" : "hidden"} 
          
        lg:w-1/2

        `}
          ref={container}
        ></div>
      </div>
    </section>
  );
}

export default Header;
