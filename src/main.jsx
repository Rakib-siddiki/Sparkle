import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
// eslint-disable-next-line no-unused-vars
import firebaseConfig from "./FireBaseConfig.jsx";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// pages
import Login from "./pages/login/Login.jsx";
import Reg from "./pages/reg/Reg";

import NotFound from "./pages/not-found/NotFound";
import ForgetPassword from "./pages/forgetPassword/forgetPassword";
import Home from "./pages/home/Home";


// redux tool-kit
import { store } from "./store";
import { Provider } from "react-redux";
import Message from "./pages/massage/Message.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Reg />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/forgetPassword",
    element: <ForgetPassword />,
  },
  {
    path: "/message",
    element: <Message/>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>,
);
