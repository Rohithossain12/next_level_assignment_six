
import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import ErrorPage from "@/pages/ErrorPage";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Unauthorized from "@/pages/Unauthorized";
import Verify from "@/pages/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { senderSidebarItems } from "./senderSidebarItems";
import { receiverSidebarItems } from "./receiverSidebarItems";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      {
        Component: HomePage,
        index: true,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
    ]
  },

  // Admin Routes

  {
    path: "/admin",
    Component: DashboardLayout,
    children: [
      ...generateRoutes(adminSidebarItems)
    ]
  },

  // Sender Routes
  {
    path: "/sender",
    Component: DashboardLayout,
    children: [...generateRoutes(senderSidebarItems)]
  },

  // Receiver Routes
  {
    path: "/receiver",
    Component: DashboardLayout,
    children: [...generateRoutes(receiverSidebarItems)]
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