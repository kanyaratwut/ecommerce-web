import React from "react";
import AppRoute from "./routers/AppRoute";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer />
      <AppRoute />
    </>
  );
};

export default App;
