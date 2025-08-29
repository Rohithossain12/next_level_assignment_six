
import App from "@/App";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Unauthorized from "@/pages/Unauthorized";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,

  },

  {
    path: "/login",
    Component: Login,
  },

  {
    path: "/register",
    Component: Register,
  },
   {
    Component: Verify,
    path: "/verify"
  },
  {
    Component: Unauthorized,
    path: "/unauthorized"
  },


]);