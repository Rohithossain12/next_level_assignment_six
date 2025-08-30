import Analytics from "@/pages/Admin/Analytics";
import ManageUsers from "@/pages/Admin/ManageUsers";
import type { ISidebarItem } from "@/types";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analysis",
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
        component:ManageUsers
      },
    ],
  },
];
