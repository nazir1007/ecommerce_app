// For Add Product to Cart

export const addCartProduct = (product) => {
  return {
    type: "ADD_CART_PRODUCT",
    payload: product,
  };
};

// For Delete Item from Cart

export const deleteCartProduct = (product) => {
  return {
    type: "DELETE_CART_PRODUCT",
    payload: product,
  };
};

// For Add all product Item in Cart
export const addAllCartProduct = (product) => {
  return {
    type: "ADD_ALL_CART_PRODUCT",
    payload: product,
  };
};
