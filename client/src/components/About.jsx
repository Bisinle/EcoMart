import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import cart from "../assets/cart.jpg";

function About() {
  return (
    <>
      <section className="flex justify-around gap-5 bg-gray-100 py-11 rounded-lg">
        <div className="about-cart">
          <img
            src={cart}
            // src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg"
            className="cart-img rounded-md"
            alt="cart-image"
          />
        </div>
        <article className="justify-self-end w-[35rem] leading-7">
          <h2 className="text-purple-400 text-3xl font-bold">About Us</h2>
          <p>
            At Ecomm, we're on a mission to redefine and revolutionize your
            online shopping experience by providing a seamless and delightful
            shopping experience, offering a curated selection of products that
            combine quality, style and afffordability. We believe that shopping
            should be more than just a transaction, it should be an enjoyable
            journey. Our goal is to provide you with a curated selection of high
            quality products, paired with exceptional customer service, all
            within a user-friendly platform.
          </p>
        </article>
      </section>
    </>
  );
}

export default About;
