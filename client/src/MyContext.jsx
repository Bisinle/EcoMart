import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const about = ["Home", "About Us", "Sign In", "Contact Us"];

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState([]);
  const [wishlistCount, setWishlistCount] = useState([]);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState([]);

  const removeFromWishlist = (prod) => {
    const updatedWishlist = wishlistCount.filter(
      (element) => element.id !== prod.id
    );
    setWishlistCount(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const addToCartFromWishlist = (prod) => {
    const found = cartCount.find((element) => element === prod.id);

    if (found) {
      toast.info("This item is already in your cart.");
    } else {
      const updatedCart = [...cartCount, prod.id];
      setCartCount(updatedCart);

      setProducts((prevProducts) => [...prevProducts, prod]);
      setQuantity((prevQuantity) => [...prevQuantity, 1]);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  return (
    <AppContext.Provider
      value={{
        cartCount,
        setCartCount,
        globalvariable,
        wishlistCount,
        setGlobalvariable,
        setWishlistCount,
        products,
        setProducts,
        quantity,
        setQuantity,
        removeFromWishlist,
        addToCartFromWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
