import React, { useState, createContext, useEffect } from "react";
import { auth } from "../firebase/config";

export const ProductContext = createContext();
const ProductProvider = ({ children }) => {
  const [cart, setCart] = useState(false);
  const [typeList, setTypeList] = useState("");
  const [data, setData] = useState([]);
  const [womans, setWomans] = useState([]);
  const [user, setUser] = useState({});
  const [checkOut, setCheckOut] = useState([]);

  useEffect(() => {
    fetch("https://62238cbc3af069a0f9a5013b.mockapi.io/onoffshop/woman")
      .then((res) => res.json())
      .then((product) => {
        setWomans(product);
      });
  }, []);

  useEffect(() => {
    const unsubscibed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({
          displayName,
          email,
          uid,
          photoURL,
        });
        return;
      }

      // reset user info
      setUser({});
    });

    // clean function
    return () => {
      unsubscibed();
    };
  }, []);

  const handleSetData = (product) => {
    if (data.length === 0) return setData([...data, product]);
    else {
      const newData = data.forEach((item) => {
        if (item.code === product.code && item.size === product.size){
          item.count += product.count
        }
      });
      setData(newData)

    }
  };

  const handleDeleteData = (id) => {
    const newData = data.filter((item) => {
      return item.id !== id;
    });
    setData(newData);
  };

  const value = {
    checkout: checkOut,
    setCheckOut: setCheckOut,
    user: user,
    womans: womans,
    cart: cart,
    setCart: setCart,
    typeList: typeList,
    setTypeList: setTypeList,
    data: data,
    setData: setData,
    handleSetData: handleSetData,
    handleDeleteData: handleDeleteData,
  };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductProvider;
