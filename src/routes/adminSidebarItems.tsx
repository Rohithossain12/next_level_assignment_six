
import Profile from "@/pages/Profile";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";
const Analytics = lazy(() => import("@/pages/Admin/Analytics"))
const ManageUsers = lazy(() => import("@/pages/Admin/ManageUsers"))

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "Manage Users",
        url: "/admin/users",
        component: ManageUsers
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        url: "/admin/profile",
        component: Profile,
      },
    ],
  },
];
