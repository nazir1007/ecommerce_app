//  --------Importing useState and useEffect  Hookes -----------  //
import React, { useEffect } from "react";

// ---- importing Navbar.js Components  ----  //
import Navbar from "./Navbar";

// ---- importing Home.js Components  ----  //
import Home from "./Home";

// ---- importing ProductList.js Components  ----  //
import ProductsList from "./ProductsList";

// ---- importing Product.js Components  ----  //
import ProductDetail from "./ProductDetail";

// ---- importing AddProduct.js Components  ----  //
import AddProduct from "./AddProduct";

// ---- importing Cart.js Components  ----  //
import Cart from "./Cart";

// ---- importing App.css file  ----  //
import "./App.css";

// ---- importing react-router-dom  ----  //
import { Routes, Route } from "react-router-dom";

// -----  importing addAllCartProduct from redux/action  -----  //
import { addAllCartProduct } from "../redux/action";

// ---- importing useDispatch hook from ract-redux   ----  //
import { useDispatch } from "react-redux";

// ----  getCartProducts Function for getting cart product  ---- //
const getCartProducts = async () => {
  //--- api Link  --- //
  const url = "http://localhost:5000/cart";
  // const devEnv = process.env.NODE_ENV !== "production";
  // const { REACT_APP_DEV_CART_URL, REACT_APP_PROD_CART_URL } = process.env;
  // const res = await fetch(
  //   devEnv ? REACT_APP_DEV_CART_URL : REACT_APP_PROD_CART_URL
  // );
  const res = await fetch(url);
  return res.clone().json();
};

function App() {
  //    -----  useDispatch react-redux hook  -----  //
  const dispatch = useDispatch();

  //    -----  useEffect hook  -----  //
  useEffect(() => {
    getCartProducts().then((e) => {
      dispatch(addAllCartProduct(e));
    });
  });

  return (
    <div className="App">
      {/* ---- Navbar Component  ---- */}
      <Navbar />
      <Routes>
        {/* ---- Home Component  ---- */}
        <Route path="/" element={<Home />} />
        {/* ---- ProductList Component  ---- */}
        <Route path="/products" element={<ProductsList />} />
        {/* ---- Product Component  ---- */}
        <Route path="/products/:id" element={<ProductDetail />} />
        {/* ---- AddProduct Component  ---- */}
        <Route path="/add" element={<AddProduct />} />
        {/* ---- Cart Component  ---- */}
        <Route path="/cart" element={<Cart item={getCartProducts} />} />
      </Routes>
    </div>
  );
}

export default App;
