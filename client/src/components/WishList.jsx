import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/animation_lndbixne.json"
import { useAppContext } from "../MyContext";
import "./WishList.css";

function Wishlist() {
  const { wishlistCount, removeFromWishlist, addToCartFromWishlist,  } = useAppContext();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="wishlist">
      {wishlistCount.length > 0 ? (
        wishlistCount.map((product, index) => (
          <div key={index} className="wishlist-item">
            <img className="img" alt={product.name} src={product.image} />
            <div className="wishlist-item-details">
              <h2>{product.name}</h2>
              <p className="price">{product.price}</p>
              <button className="wish-cart-button" onClick={() => addToCartFromWishlist(product)}>
                Add to Cart
              </button>
              <button className="remove-button" onClick={() => removeFromWishlist(product)}>
                Remove from Wishlist
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>
          <Lottie options={defaultOptions} height={400} width={400} />
          <h2>Your wishlist is empty. Start adding products!</h2>
        </div>
      )}
    </div>
  );
}

export default Wishlist;
