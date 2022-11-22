// -----Importing useState and useEffect Hooks   -----//
import React, { useEffect, useState } from "react";

// -----Importing useParams Hook from react-router-dom   -----//
import { useParams } from "react-router-dom";

// -----Importing useDispatch react-redux  Hooks   -----//
import { useDispatch } from "react-redux";

// -----Importing addProduct and deleteProduct from redux folder   -----//
import { addCartProduct } from "../redux/action/index";

//   -------Importing react-toastify -----------//
import { toast } from "react-toastify";

const Product = () => {
  //  ---- useParams react-roueter-dom hook  ----  //
  const { id } = useParams();

  //  ---- useState hook  ----  //
  const [product, setProduct] = useState([]);
  const [addToCart, setAddToCart] = useState({});

  //  ---- useDispatch react-redux hook  ----  //
  const dispatch = useDispatch();

  //  ---- cart_submit function for fetching product   ----  //
  const cart_submit = async (payload) => {
    const devEnv = process.env.NODE_ENV !== "production";
    const { REACT_APP_DEV_CART_URL, REACT_APP_PROD_CART_URL } = process.env;
    //  ----   Api-Link for Cart ----  //
    await fetch(`${devEnv ? REACT_APP_DEV_CART_URL : REACT_APP_PROD_CART_URL}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status !== 201) {
          return;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.info(data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("something went wrong");
      });
  };

  //  ---- handleCart function for adding product in the Cart  ----  //
  const handleCart = (product) => {
    dispatch(addCartProduct(product));
    setAddToCart((addToCart) => ({ ...addToCart, [product.id]: product.id }));
    toast.success("product added in the Cart ");
    cart_submit(product);
  };

  //  ---- useEffect hook  ----  //
  useEffect(() => {
    //  ---- getProduct Function for getting product from Api  ----  //
    const getProduct = async () => {
      const devEnv = process.env.NODE_ENV !== "production";
      const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
      //  ---- api-link  ----  //
      const res = await fetch(
        `${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}/${id}`
      );
      setProduct(await res.json());
    };
    getProduct();
  }, [id]);

  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            height="400px"
            width="400px"
          />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className="display-5">{product.title}</h1>
          <p className="lead fw-bolder">
            Rating {product.rating}
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 fw-bold my-4">Rs: {product.price}</h3>
          <p className="lead">{product.description}</p>
          {/*  ---- handleCart button ----  */}
          <button
            onClick={() => handleCart(product)}
            disabled={addToCart[product.id]}
            className="btn btn-outline-secondary my-5"
          >
            Add to Cart
          </button>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container py-5">
        {/* ----  ShowProduct Component */}
        <div className="row py-4">{<ShowProduct />}</div>
      </div>
    </div>
  );
};

export default Product;
