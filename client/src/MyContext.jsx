import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState([]);
  const [wishlistCount, setWishlistCount] = useState([]);
  const [globalvariable, setGlobalvariable] = useState("");

  return (
    <AppContext.Provider
      value={{
        cartCount,
        setCartCount,
        globalvariable,
        wishlistCount,
        setGlobalvariable,
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
