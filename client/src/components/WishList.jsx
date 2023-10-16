import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/animation_lndbixne.json";
import { useAppContext } from "../MyContext";
import { FaCartPlus } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";
// import "./WishList.css";

function Wishlist() {
  const { wishlistCount, removeFromWishlist, addToCartFromWishlist } =
    useAppContext();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="wishlist bg-gray-100 px-5 py-6 rounded-md flex justify-center">
      {wishlistCount.length > 0 ? (
        <table className="table-auto">
          <thead>
            <tr>
              <th className="wishlist-th">Product</th>
              <th className="wishlist-th">Name</th>
              <th className="wishlist-th">Description</th>
              <th className="wishlist-th">Price</th>
              <th className="wishlist-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {wishlistCount.map((product, index) => (
              <tr key={index} className="border-b-[1px] border-gray-200">
                <td className="wishlist-td">
                  <img
                    className="w-24 h-24 object-contain rounded-md"
                    alt={product.name}
                    src={product.image}
                  />
                </td>
                <td className="wishlist-td">{product.name}</td>
                <td className="wishlist-td">{product.description}</td>
                <td className="wishlist-td">$ {product.price}</td>
                <td className="wishlist-td">
                  <button
                    className="wishlist-action bg-green-400"
                    onClick={() => addToCartFromWishlist(product)}
                  >
                    <FaCartPlus className="w-[2rem] h-[1.2rem] hover:scale-110" />
                    {/* Add to Cart */}
                  </button>
                  <button
                    className="wishlist-action bg-red-300"
                    onClick={() => removeFromWishlist(product)}
                  >
                    <FaTrashCan className="w-[2rem] h-[1.2rem] hover:scale-110" />
                    {/* Remove from Wishlist */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
