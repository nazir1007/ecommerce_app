// -----Importing useState and useEffect Hooks   -----//
import React, { useState, useEffect } from "react";

// -----Importing useDispatch react-redux  Hooks   -----//
import { useDispatch } from "react-redux";

// -----Importing deleteProduct from redux folder   -----//
import { deleteCartProduct } from "../redux/action/index";

//   -------Importing react-toastify -----------//
import { toast } from "react-toastify";

const Cart = ({ item }) => {
  //  ---- useDispatch react-redux hook  ----  //
  const dispatch = useDispatch();

  //  ---- useState hook  ----  //
  const [data, setData] = useState([]);

  //   ----  api- link  ---- //

  const url = "http://localhost:5000/cart";

  //   --- cart_delete function   ----  //
  const cart_delete = async (id) => {
    // const devEnv = process.env.NODE_ENV !== "production";
    // const { REACT_APP_DEV_CART_URL, REACT_APP_PROD_CART_URL } = process.env;
    // await fetch(
    //   `${devEnv ? REACT_APP_DEV_CART_URL : REACT_APP_PROD_CART_URL}/${id}`,
    //   {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200) {
          toast.info("Something went wrong");
          return;
        } else {
          item().then((e) => {
            setData(e);
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.info("Something went wrong");
      });
  };

  //  -----  handleClose Function for deleting the item from Cart  -----  //
  const handleClose = (item) => {
    dispatch(deleteCartProduct(item));
    toast.info("Product removed succesfully from the Cart");
    cart_delete(item.id);
  };
  //  ---- useEffect Hook  ---- //
  useEffect(() => {
    item().then((e) => setData(e));
  }, [item]);

  const cartItems = (cartItem) => {
    return (
      <div
        className=" cart-card px-2 my-3 bg-light rounded-3"
        key={cartItem.id}
      >
        <div className="container py-2">
          {/*  -----  handleClose Button  -----   */}
          <button
            className="btn-close float-end"
            area-lable="Close"
            onClick={() => handleClose(cartItem)}
          ></button>
          <div className="row justify-content-center">
            <div className="col-md-4">
              <img
                src={cartItem.image}
                alt={cartItem.title}
                height="200px"
                width="180px"
              />
            </div>
            <div className="col-md-4">
              <h3>{cartItem.title}</h3>
              <p className="lead fw-bold">Rs: {cartItem.price}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  //   ----- emptyCart function -----  //
  const emptyCart = () => {
    return (
      <div className="px-4 my-5 bg-light rounded-3">
        <div className="container py-4">
          <div className="row">
            <h3>Your Cart is Empty!</h3>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      {data.length === 0 && emptyCart()}
      {data.length !== 0 && data.map(cartItems)}
    </div>
  );
};

export default Cart;
