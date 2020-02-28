import React from "react";
import ReactDom from "react-dom";
import Router from "Router";
import "css/app.scss";
import "css/style.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDom.render(
  <div>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />

    <ToastContainer />
    <Router />
  </div>,
  document.querySelector("#root")
);
