import { createContext, useContext, useState } from "react";

export const about = ["Home", "About Us", "Sign In", "Contact Us"];

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState([]);
  const [wishlistCount, setWishlistCount] = useState([]);

  return (
    <AppContext.Provider
      value={{
        cartCount,
        setCartCount,
        wishlistCount,
        setWishlistCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
