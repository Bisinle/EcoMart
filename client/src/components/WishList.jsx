import { useAppContext } from "../MyContext";
import "./WishList.css";

function Wishlist() {
  const { wishlistCount, removeFromWishlist, addToCartFromWishlist,  } = useAppContext();

  return (
    <div className="wishlist">
      {wishlistCount.map((product, index) => (
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
      ))}
    </div>
  );
}

export default Wishlist;
