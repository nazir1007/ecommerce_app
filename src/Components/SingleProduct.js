//  --------Importing useState Hookes -----------  //
import React, { useState } from "react";

//  --------Importing toast from react-toastify -----------  //
import { toast } from "react-toastify";

const SingleProduct = ({
  product,
  NavLink,
  getProducts,
  handleCart,
  addToCart,
}) => {
  //  -------- useState Hookes -----------  //
  const [state, setState] = useState(false);
  const [formTitle, setFormTitle] = useState(product.title);
  const [formDescription, setFormDescription] = useState(product.description);
  const [formPrice, setFormPrice] = useState(product.price);
  const [formRating, setFormRating] = useState(product.rating);

  //    -----  Api-Link  -----   //
  const url =
    "https://nazir1007-supreme-space-happiness-wjr7v9xrx7vh5v7r-5000.preview.app.github.dev/products";

  // -----  handleEdit function for editing product   -----  //
  const handleEdit = (e) => {
    e.preventDefault();
    // const devEnv = process.env.NODE_ENV !== "production";
    // const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;

    // fetch(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}/${product.id}`, {
    fetch(`${url}/${product.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: formTitle,
        price: formPrice,
        description: formDescription,
        rating: formRating,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        return res.json();
      })

      .then(() => {
        getProducts();
        toast.success("Product Successfully updated");
        setState({
          showTextAreaEdit: false,
        });
      });
  };

  //  --------hnadleCancelEdit function for cancle  -----------  //
  const handleCancelEdit = () => {
    setState({
      showTextAreaEdit: false,
    });
  };

  //  -------- displayEdit function for edit -----------  //
  const displayEdit = () => {
    setState({
      showTextAreaEdit: true,
    });
  };

  //  --------handleChangeDescription function for editing description -----------  //
  const handleChangeDescription = (e) => {
    setFormDescription(e.target.value);
  };

  //  --------handleChangeTitle function for editing title -----------  //
  const handleChangeTitle = (e) => {
    setFormTitle(e.target.value);
  };

  //  --------handleChangePrice function for editing price -----------  //
  const handleChangePrice = (e) => {
    setFormPrice(e.target.value);
  };

  //  --------handleChangeRating function for editing rating -----------  //
  const handleChangeRating = (e) => {
    setFormRating(e.target.value);
  };

  //  --------handleDelte function for deleting product from DB -----------  //
  const handleDelete = async (id) => {
    // const devEnv = process.env.NODE_ENV !== "production";
    // const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
    // await fetch(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}/${id}`, {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200) {
          toast.info("Something went wrong");
          return;
        } else {
          getProducts();
          toast.success("Product deleted successfuly from the DB");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <div className="product-card">
          <div className="col-md-4 mt-4">
            <NavLink to={`/products/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                height="300px"
                width="300px"
              />
            </NavLink>
          </div>
          <div className="col-md-8">
            {state.showTextAreaEdit ? (
              <form onSubmit={handleEdit}>
                <textarea
                  onChange={handleChangeTitle}
                  className="textarea-title"
                  type="text"
                  value={formTitle}
                >
                  {formTitle}
                </textarea>
                <br />
                <label className=" fw-bold fs-5">Rating : </label>
                <input
                  onChange={handleChangeRating}
                  className="input-rating"
                  type="number"
                  name="rating"
                  placeholder=""
                  value={formRating}
                />
                <br />
                <label className="fw-bold fs-3">Rs : </label>
                <input
                  onChange={handleChangePrice}
                  className="input-price"
                  type="number"
                  name="price"
                  placeholder=""
                  value={formPrice}
                />
                <br />
                <textarea
                  onChange={handleChangeDescription}
                  value={formDescription}
                  className="textarea-description"
                >
                  {formDescription}
                </textarea>
                {/*  -----   Cancel button  ----- */}
                <button
                  className="btn btn-outline-warning float-end px-3 py-2 me-1"
                  type="button"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
                {/*  -----   Save button  ----- */}
                <button
                  className="btn btn-outline-success float-end px-3 py-2 me-1"
                  type="submit"
                >
                  Save
                </button>
              </form>
            ) : (
              <span>
                <h1>{product.title}</h1>
                <p className="lead fw-bolder">
                  Rating :{product.rating}
                  <i className="fa fa-star"></i>
                </p>
                <h3 className="display-8 fw-bold my-2">Rs: {product.price}</h3>
                <p className="lead">{product.description}</p>

                {/*  -----   Add to Cart button  ----- */}
                <button
                  onClick={() => handleCart(product)}
                  disabled={addToCart[product.id]}
                  className="btn btn-outline-secondary  px-4 py-2 me-4"
                >
                  Add to Cart
                </button>

                {/*  -----   Delete button  ----- */}
                <button
                  className="btn btn-outline-danger float-end px-3 py-2 me-2"
                  onClick={() => handleDelete(product.id)}
                >
                  <i className="fa-sharp fa-solid fa-trash"></i>
                </button>

                {/*  -----   Edit button  ----- */}
                <button
                  className="btn btn-outline-primary float-end px-3 py-2 me-1"
                  type="submit"
                  onClick={displayEdit}
                >
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
