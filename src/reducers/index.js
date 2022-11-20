//  ----  importing addCartProduct  -----  //
import addCartProduct from "./addCartProduct";

//  ----- importing combineReducers from redux  -----  //
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  addCartProduct,
});

export default rootReducers;
