
import CreateParcel from "@/pages/Sender/CreateParcel";
import type { ISidebarItem } from "@/types";

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

];
