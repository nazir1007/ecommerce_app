const addCartProduct = [];

const addCartProducts = (state = addCartProduct, action) => {
  //  ---- Switch Statement  ----  //
  switch (action.type) {
    case "ADD_ALL_CART_PRODUCT":
      return action.payload;
    case "ADD_CART_PRODUCT":
      return [...state, action.payload];

    case "DELETE_CART_PRODUCT":
      return (state = state.filter((x) => {
        return x.id !== action.payload.id;
      }));

    default:
      return state;
  }
};

export default addCartProducts;
