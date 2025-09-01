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
