import React from "react";

//  ----importing useSelector react-redux hook  ----  //
import { useSelector } from "react-redux";

//  ---- importing NavLink from react-router-dom  ----  //
import { NavLink } from "react-router-dom";

const Navbar = () => {
  //  ---- useSelector react-redux hook  ----  //
  const cart_item = useSelector((state) => state.addCartProduct);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light  py-3 shadow-sm">
        <div className="container">
          {/*  ---- NavLink for Navbar Logo  ----  */}
          <NavLink className="navbar-brand fw-bold fs-4" to="/">
            <img src="assets/logo.png" className="Logo" alt="" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/*  ---- NavLink for Navbar Logo  ----  */}
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                {/*  ---- NavLink for Products  ----  */}
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                {/*  ---- NavLink for Add Product+  ----  */}
                <NavLink className="nav-link" to="/add">
                  Add Product<i className="fa-solid fa-circle-plus ms-1"></i>
                </NavLink>
              </li>
            </ul>

            {/*  -----  Cart Icon  -----   */}
            <div className="buttons">
              {/*  ---- NavLink for Cart  ----  */}
              <NavLink to="/cart" className="btn btn-outline-dark ms-2">
                <span
                  className="fa fa-shopping-cart me-1"
                  style={{
                    fontSize: 20,
                    cursor: "pointer",
                  }}
                ></span>
                Cart ({cart_item.length})
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
