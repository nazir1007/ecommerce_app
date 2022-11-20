import React from "react";

//  ----- importing ReactDOM from react-dom  -----  //
import ReactDOM from "react-dom/client";

//  ----- importing App Component  -----  //
import App from "./Components/App";

//  ----- importing BrowserRouter from react-router-dom  -----  //
import { BrowserRouter } from "react-router-dom";

//  ----- importing Provider from react-redux  -----  //
import { Provider } from "react-redux";

//  ----- importing store from redux  -----  //
import store from "./redux/store";

//  ----- importing ToastContainer from react-toastify  -----  //
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //  -----  BrowserRouter  -----  //
  <BrowserRouter>
    {/*  ----- Provider -----  */}
    <Provider store={store}>
      {/* ----- App Component */}
      <App />
    </Provider>
    {/*  ----- ToastContainer -----  */}
    <ToastContainer />
  </BrowserRouter>
);
