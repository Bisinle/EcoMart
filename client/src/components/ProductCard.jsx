import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

function ProductCard() {
  return (
    <article className="product-card">
      <div>
        <img
          src="https://www.theclickstore.co.ke/wp-content/uploads/2021/02/83534a33-0998-43dc-915a-4ec0a686d679.jpg"
          alt=""
          className="rounded-lg "
        />
      </div>
      <div className="product_details card-details">
        <p>product name</p>
        <p>$ 200</p>
      </div>
      <div className="product_card_footer card-details items-center ">
        <button
          className="bg-transparent border-2 border-black rounded-full px-3 py-2 
        text-md hover:bg-black hover:text-white"
        >
          Add to cart
        </button>
        <AiOutlineHeart className="nav-icons" />
      </div>
    </article>
  );
}

export default ProductCard;
