import { createContext, useContext, useState } from "react";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState([]);
  const [wishlistCount, setWishlistCount] = useState([]);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState([]);

  return (
    <AppContext.Provider
      value={{
        cartCount,
        setCartCount,
        wishlistCount,
        setWishlistCount,
        products,
        setProducts,
        quantity,
        setQuantity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
