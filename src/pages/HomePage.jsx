import React from "react";
import { Route, Routes } from "react-router-dom";
import Checkout from "../component/Checkout/Checkout";
import Home from "../component/Home/Home";
import Login from "../component/Login/Login";
import ProductDetail from "../component/Product/ProductDetail";
import Products from "../component/Product/Products";
import Profile from "../component/Profile/Profile";
import Register from "../component/Register/Register";

const HomePage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:sex" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:sex/:code" element={<ProductDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
};

export default HomePage;
