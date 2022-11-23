// -----Importing useState and useEffect Hooks   -----//
import React, { useState, useEffect } from "react";

// -----Importing NavLink from react-router-dom   -----//
import { NavLink } from "react-router-dom";

// -----Importing useDispatch and useSelector from react-redux Hooks   -----//
import { useDispatch } from "react-redux";

// -----Importing addProduct from redux folder   -----//
import { addCartProduct } from "../redux/action/index";

//   -------Importing react-toastify CSS -----------//
import "react-toastify/dist/ReactToastify.css";

//   -------Importing react-toastify -----------//
import { toast } from "react-toastify";

//   -------Importing SingleProduct component  -----------//
import SingleProduct from "./SingleProduct";

const ShowProducts = () => {
  //  ---- useState hook  ----  //
  const [productList, setProductList] = useState([]);
  const [filteredProductList, setFilteredProductList] = useState(productList);
  const [addToCart, setAddToCart] = useState({});
  const [sortBtn, setSortBtn] = useState("SortBy Price");

  //  ---- useDispatch react-redux hook  ----  //
  const dispatch = useDispatch();

  //  ---- cart_submit function for fetching product   ----  //
  const cart_submit = async (payload) => {
    // const devEnv = process.env.NODE_ENV !== "production";
    // const { REACT_APP_DEV_CART_URL, REACT_APP_PROD_CART_URL } = process.env;
    //  ----   Api-Link for Cart ----  //
    //await fetch(devEnv ? REACT_APP_DEV_CART_URL : REACT_APP_PROD_CART_URL, {
    await fetch("http://localhost:5000/cart", {
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
      .then((productList) => {
        console.info(productList);
      })
      .catch((err) => {
        console.error(err);
        toast.error("something went wrong");
      });
  };

  //  ---- handleCart function for adding product in to Cart  ----  //
  const handleCart = (product) => {
    dispatch(addCartProduct(product));
    setAddToCart((addToCart) => ({ ...addToCart, [product.id]: product.id }));
    toast.success("product added in the Cart ");
    cart_submit(product);
  };

  //  ---- Api-Link for Products  ----  //
  const url = "https://necomapp.herokuapp.com/api";

  //  ---- getProducts function for getting product  ----  //
  const getProducts = async () => {
    // const devEnv = process.env.NODE_ENV !== "production";
    // const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
    // const res = await fetch(
    //   `${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}`
    // );
    const res = await fetch(url);
    let componentMounted = true;

    if (componentMounted) {
      setProductList(await res.clone().json());
      setFilteredProductList(await res.json());
    }
    return () => {
      componentMounted = false;
    };
  };

  //  ---- useState hook  ----  //
  useEffect(() => {
    getProducts();
  }, []);

  //  ---- filteredProductListProduct function for filteredProductListing product by Category  ----  //
  const filterProduct = (cat) => {
    const updatedList = productList.filter((x) => x.category === cat);
    setFilteredProductList(updatedList);
  };

  //  ---- hnadleSortAsc function for sorting productList in ascending order by price  ----  //
  const handleSortAsc = () => {
    if (sortBtn === "SortBy Price") {
      const sorted_data = productList.sort((a, b) => a.price - b.price);
      setFilteredProductList(sorted_data);
      toast.info("Product sorted By Price");
      setSortBtn(
        <>
          SortBy Price
          <i className="fa-sharp fa-solid fa-xmark ms-1"></i>
        </>
      );
      setProductList(sorted_data);
    } else {
      toast.info("Sort Remove");
      setSortBtn("SortBy Price");
      getProducts();
    }
  };

  return (
    <>
      <div>
        <div className="buttons d-flex justify-content-center mb-2 pb-1 ">
          {/*  -----  All category button  -----  */}
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setFilteredProductList(productList)}
          >
            All
          </button>
          {/*  -----  Men's Clothing button  -----  */}
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          {/*  -----  Women's Clothing category button  -----  */}
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          {/*  -----  Jewelery category button  -----  */}
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          {/*  ----- Electronic category button  -----  */}
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronic
          </button>
        </div>

        {/*  -----  handleSortAsc button  -----  */}
        <button
          className="btn btn-outline-secondary float-end bg-none me-2 mb-1"
          onClick={handleSortAsc}
        >
          {sortBtn}
        </button>
      </div>

      {filteredProductList.map((product, key) => (
        //  -----  SingleProduct Component  -----  //
        <SingleProduct
          key={key}
          product={product}
          NavLink={NavLink}
          getProducts={getProducts}
          handleCart={handleCart}
          addToCart={addToCart}
        />
      ))}
    </>
  );
};

export default ShowProducts;
