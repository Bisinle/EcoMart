import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useAppContext } from "../MyContext";
import { toast } from "react-toastify";

function ProductCard({ id, image, price, name, description }) {
  const {
    setCartCount,
    setWishlistCount,
    cartCount,
    wishlistCount,
    setProducts,
    setQuantity,
    quantity,
  } = useAppContext();

  const addToCart = (prodid) => {
    const found = cartCount.find((element) => element === prodid);
  
    if (found) {
      toast.info("This item is already in your cart.");
      const index = cartCount.indexOf(prodid);
  
      setQuantity((prevQuantity) => {
        const updatedQuantity = [...prevQuantity];
        updatedQuantity[index]++;
        localStorage.setItem("quantity", 
          JSON.stringify(updatedQuantity.map(Number)));
        return updatedQuantity;
      });
    } else {
      const updatedCart = [...cartCount, prodid];
      setCartCount(updatedCart);
      const product = { id, image, price: parseFloat(price), name, description };
      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts, product];
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        return updatedProducts;
      });
  
      setQuantity((prevQuantity) => {
        const updatedQuantity = [...prevQuantity, 1];
        localStorage.setItem("quantity", JSON.stringify(updatedQuantity.map(Number)));
        return updatedQuantity;
      });
  
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };
  

  const addToWishlist = (prod) => {
    const found = wishlistCount.find((element) => element.id === prod.id);
    // console.log(prod);

    if (found) {
      toast.info("This item is already on your wishlist.");
    } else {
      const updatedWishlist = [prod, ...wishlistCount];
      setWishlistCount(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }
  };

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const savedQuantity = JSON.parse(localStorage.getItem("quantity")) || [];

    setWishlistCount(savedWishlist);
    setCartCount(savedCart);
    setProducts(savedProducts);
    setQuantity(savedQuantity.map(Number));
  }, []);

  return (
    <article product={id} className="product-card">
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
          onClick={() => addToWishlist({ id, image, price, name, description })}
          className="nav-icons"
        />
      </div>
    </article>
  );
}

export default ProductCard;
