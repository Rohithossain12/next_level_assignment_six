


export type ParcelStatus =
  | "REQUESTED"
  | "APPROVED"
  | "DISPATCHED"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "CANCELED"
  | "RETURNED";

export const ParcelStatusValues = {
  REQUESTED: "REQUESTED",
  APPROVED: "APPROVED",
  DISPATCHED: "DISPATCHED",
  IN_TRANSIT: "IN_TRANSIT",
  DELIVERED: "DELIVERED",
  CANCELED: "CANCELED",
  RETURNED: "RETURNED",
} as const;




export interface ParcelStatusLog {
  status: string;
  timestamp: string;
  note?: string;
}




export interface Parcel {
  _id?: string;
  trackingId: string;
  type: string;
  weight: number;
  fee: number;
  sender: string;
  receiver: string;
  pickupAddress: string;
  deliveryAddress: string;
  statusLogs: ParcelStatusLog[];
  isBlocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
}



