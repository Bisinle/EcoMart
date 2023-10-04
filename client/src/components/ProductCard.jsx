import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useAppContext } from "../MyContext";

function ProductCard({ id, image, price, name }) {
  const { setCartCount, setWishlistCount, cartCount, wishlistCount } =
    useAppContext();

  const addToCart = (prodid) => {
    const updatedCart = [...cartCount, prodid];
    setCartCount(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const addToWishlist = (prodid) => {
    const found = wishlistCount.find((element) => element === prodid);

    if (found) {
      const updatedWishlist = wishlistCount.filter(
        (element) => element !== prodid
      );
      setWishlistCount(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } else {
      const updatedWishlist = [prodid, ...wishlistCount];
      setWishlistCount(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }
  };

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    setWishlistCount(savedWishlist);
    setCartCount(savedCart);
  }, []);

  return (
    <article prodid={id} className="product-card">
      <div className="product-image">
        <img
          src={image}
          alt="product-image"
          className="rounded-sm prod-image"
        />
      </div>
      <div className="product_details card-details">
        <p>{name}</p>
        <p>{price}</p>
      </div>
      <div className="product_card_footer card-details items-center ">
        <button
          onClick={() => addToCart(id)}
          className="bg-transparent border-2 border-black rounded-full px-3 py-2 
        text-md hover:bg-black hover:text-white"
        >
          Add to cart
        </button>
        <AiOutlineHeart
          onClick={() => addToWishlist(id)}
          className="nav-icons"
        />
      </div>
    </article>
  );
}

export default ProductCard;
