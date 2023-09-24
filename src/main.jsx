import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import firebaseConfig from "./FireBaseConfig.jsx";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Reg from "./pages/reg/Reg";
import Home from "./components/Home";
import NotFound from "./pages/not-found/NotFound";
import ForgetPassword from "./pages/forgetPassword/forgetPassword";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Reg />,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/forgetPassword",
    element: <ForgetPassword/>,
  },
  {
    path: "*",
    element: <NotFound/>,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
