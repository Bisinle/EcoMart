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
    <section className="py-10 " data-aos="fade-up" data-aos-duration="1000">
      <div className="container flex flex-wrap items-center justify-center mx-autot mt-10 md:px-12 md:flex-row">
        <div className="mb-14 lg:mb-0 md:w-1/2  ">
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

// return (
//   <section className="py-12 md:flex md:justify-between md:items-center">
//     <div className="sm:w-100  md:1/2 px-7   ">
//       <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-800 mb-4">
//         WELCOME TO TRADE where all your desires come to life
//       </h1>
//       <p className="text-gray-600 text-md md:text-xl my-10  ">
//         Discover a world of limitless possibilities at Trade, your go-to
//         online market. We bring you a curated selection of high-quality
//         products, from the latest tech gadgets to stylish fashion and home
//         essentials.
//       </p>
//       <NavLink
//         to={"/contacts"}
//         className="px-6 py-2   text-lg md:text-2xl text-white bg-purple-700 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
//       >
//         ContacUs
//       </NavLink>
//     </div>
//     <div
//       className={` mx-0 ${animationLoaded ? "" : "hidden"}
//      md:1/2 sm:1/4
//       `}
//       ref={container}
//     ></div>
//   </section>
// );
// }

// export default Header;

export default Header;

// return (
//   <section className="py-12 md:flex md:justify-between md:items-center">
//     <div className="sm:w-100  md:1/2 px-7   ">
//       <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-800 mb-4">
//         WELCOME TO TRADE where all your desires come to life
//       </h1>
//       <p className="text-gray-600 text-md md:text-xl my-10  ">
//         Discover a world of limitless possibilities at Trade, your go-to
//         online market. We bring you a curated selection of high-quality
//         products, from the latest tech gadgets to stylish fashion and home
//         essentials.
//       </p>
//       <NavLink
//         to={"/contacts"}
//         className="px-6 py-2   text-lg md:text-2xl text-white bg-purple-700 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
//       >
//         ContacUs
//       </NavLink>
//     </div>
//     <div
//       className={` mx-0 ${animationLoaded ? "" : "hidden"}
//      md:1/2 sm:1/4
//       `}
//       ref={container}
//     ></div>
//   </section>
// );
// }

// export default Header;
