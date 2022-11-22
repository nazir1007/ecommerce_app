//  --------Importing useState Hookes -----------  //
import React, { useState } from "react";

//   -------Importing react-toastify -----------//
import { toast } from "react-toastify";

const AddProduct = () => {
  //  ------ useState Hook  -----  //
  const [products, setProducts] = useState([]);

  //  ----- onCreate for creating new data   -----  //
  const onCreate = async (payload) => {
    const devEnv = process.env.NODE_ENV !== "production";
    const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
    //  --- Api Link ---- //
    await fetch(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}`, {
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
        console.log(data);
        setProducts((products) => [...products, data]);
        console.log(products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   ---- handleAdd for add data in DB ----  //
  const handleAdd = (e) => {
    e.preventDefault();
    let payload = {
      title: e.target.title.value,
      description: e.target.description.value,
      price: e.target.price.value,
      category: e.target.category.value,
      image: e.target.image.value,
      rating: e.target.rating.value,
    };
    onCreate(payload);
    toast.success("Product added Succesfully");
    e.target.reset();
  };
  return (
    <>
      <div className="main-container">
        {/*  ---- Form for Adding Product  ----  */}
        <form onSubmit={handleAdd}>
          <h2 className="text-center">ADD PRODUCT</h2>
          <label className="fw-bold fs-5">Title</label>
          <input type="text" name="title" required placeholder="" />
          <label className="fw-bold fs-5">Description</label>
          <input type="text" name="description" required placeholder="" />
          <label className="fw-bold fs-5">Price</label>
          <input type="text" name="price" required placeholder="" />
          <label className=" fw-bold fs-5">Category</label>
          <input type="text" name="category" required placeholder="" />
          <label className="fw-bold fs-5">Image</label>
          <input type="url" name="image" required placeholder="" />
          <label className=" fw-bold fs-5">Rating</label>
          <input type="text" name="rating" required placeholder="" />
          <div className="d-grid d-md-flex justify-content-md-end">
            {/* -----  ADD button for Adding product ----- */}
            <button
              className="btn btn-secondary me-md-2 mt-2"
              type="submit"
              onSubmit={handleAdd}
            >
              ADD
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
