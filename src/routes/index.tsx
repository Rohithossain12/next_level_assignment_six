
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
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { senderSidebarItems } from "./senderSidebarItems";
import { receiverSidebarItems } from "./receiverSidebarItems";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import TrackParcel from "@/components/TrackParcel";


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
        path: "/track-parcel",
        Component: TrackParcel,
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
    Component: withAuth(DashboardLayout, [role.superAdmin, role.admin] as TRole[]),
    children: [

      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems)
    ]
  },

  // Sender Routes
  {
    path: "/sender",
    Component: withAuth(DashboardLayout, role.sender as TRole),
    children: [
      { index: true, element: <Navigate to="/sender/create-parcel" /> },
      ...generateRoutes(senderSidebarItems)]
  },

  // Receiver Routes
  {
    path: "/receiver",
    Component: withAuth(DashboardLayout, role.receiver as TRole),
    children: [
      { index: true, element: <Navigate to="/receiver/incoming-parcels" /> },
      ...generateRoutes(receiverSidebarItems)]
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