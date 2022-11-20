import React from "react";

// ---- importing ShowProducts.js Components  ----  //
import ShowProducts from "./ShowProducts";

const ProductsList = () => {
  return (
    <div>
      <div className="container my-2 py-2">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        {/* ---- ShowProducts Component  ---- */}
        <div className="row justify-content-center">{<ShowProducts />}</div>
      </div>
    </div>
  );
};

export default ProductsList;
