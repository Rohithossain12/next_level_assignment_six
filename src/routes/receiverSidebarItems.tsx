
import GetIncomingParcels from "@/pages/Receiver/GetIncomingParcels";
import type { ISidebarItem } from "@/types";

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

];