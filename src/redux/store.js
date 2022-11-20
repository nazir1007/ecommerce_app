//   ---- importing createStore from redux  ----  //
import { createStore } from "redux";

//   -----  importing rootReducers from reducers  -----  //
import rootReducers from "../reducers";

const store = createStore(rootReducers);

export default store;
