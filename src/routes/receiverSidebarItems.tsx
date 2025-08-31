
;
import Profile from "@/pages/Profile";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";


const GetIncomingParcels = lazy(() => import("@/pages/Receiver/GetIncomingParcels"))

export const receiverSidebarItems: ISidebarItem[] = [
    {
        title: "Parcel",
        items: [
            {
                title: "Parcel Incoming",
                url: "/receiver/incoming-parcels",
                component: GetIncomingParcels
            },
        ],
    },

    {
        title: "Account",
        items: [
            {
                title: "Profile",
                url: "/receiver/profile",
                component: Profile,
            },
        ],
    },

];