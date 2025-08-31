
import Profile from "@/pages/Profile";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const CreateParcel = lazy(() => import("@/pages/Sender/CreateParcel"))

export const senderSidebarItems: ISidebarItem[] = [
    {
        title: "Parcel",
        items: [
            {
                title: "Parcel Create",
                url: "/sender/create-parcel",
                component: CreateParcel
            },
        ],
    },


    {
        title: "Account",
        items: [
            {
                title: "Profile",
                url: "/sender/profile",
                component: Profile,
            },
        ],
    },

];
