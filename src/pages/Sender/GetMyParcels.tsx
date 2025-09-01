/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";
import { useState } from "react";
import { useCancelParcelMutation, useGetMyParcelsQuery } from "@/redux/features/parcel/parcel.api";
import Spinner from "@/components/ui/Spinner";

export default function MyParcelsTable() {
  const { data, isLoading, isError } = useGetMyParcelsQuery(undefined);
  const [cancelParcel] = useCancelParcelMutation();
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  if (isLoading) return <Spinner/>;
  if (isError) return <p>Failed to load parcels.</p>;

  const handleCancel = async (id: string) => {
    try {
      setCancellingId(id);
      await cancelParcel(id).unwrap();
      toast.success("Parcel has been canceled successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to cancel the parcel");
    } finally {
      setCancellingId(null);
    }
  };


  const statusColor = (status: string) => {
    switch (status) {
      case "REQUESTED": return "text-blue-500 dark:text-blue-400";
      case "APPROVED": return "text-green-500 dark:text-green-400";
      case "DISPATCHED": return "text-purple-500 dark:text-purple-400";
      case "IN_TRANSIT": return "text-yellow-500 dark:text-yellow-400";
      case "DELIVERED": return "text-green-700 dark:text-green-300";
      case "CANCELED": return "text-red-500 dark:text-red-400";
      case "RETURNED": return "text-orange-500 dark:text-orange-400";
      default: return "text-gray-500 dark:text-gray-400";
    }
  };


  const blockedColor = (isBlocked: boolean) =>
    isBlocked ? "text-red-500 dark:text-red-400" : "text-green-500 dark:text-green-400";

  return (
    <div className="p-4 overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded-lg shadow-md divide-y divide-gray-300">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {["Tracking", "Type", "Weight", "Fee", "Pickup", "Delivery", "Status", "Updated", "Receiver", "Blc/Act", "Action"].map((heading) => (
              <th
                key={heading}
                className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-300 dark:divide-gray-700">
          {data?.data.map((parcel: any) => {
            const lastLog = parcel.statusLogs[parcel.statusLogs.length - 1];
            const lastStatus = lastLog.status;
            const lastUpdated = format(new Date(lastLog.timestamp), "dd/MM/yy");

            return (
              <tr key={parcel._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <td className="px-4 py-2 text-xs">{parcel.trackingId}</td>
                <td className="px-4 py-2 text-xs">{parcel.type}</td>
                <td className="px-4 py-2 text-xs">{parcel.weight}kg</td>
                <td className="px-4 py-2 text-xs">${parcel.fee}</td>
                <td className="px-4 py-2 text-xs">{parcel.pickupAddress}</td>
                <td className="px-4 py-2 text-xs">{parcel.deliveryAddress}</td>
                <td className={`px-4 py-2 text-xs font-semibold ${statusColor(lastStatus)}`}>
                  {lastStatus.replace("_", " ")}
                </td>
                <td className="px-4 py-2 text-xs">{lastUpdated}</td>
                <td className="px-4 py-2 text-xs">{parcel.receiver?.name || parcel.receiver?._id}</td>
                <td className={`px-4 py-2 text-xs font-semibold ${blockedColor(parcel.isBlocked)}`}>
                  {parcel.isBlocked ? "Blocked" : "Active"}
                </td>
                <td className="px-4 py-2 text-xs">
                  {lastStatus === "REQUESTED" && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleCancel(parcel._id)}
                      disabled={cancellingId === parcel._id}
                    >
                      {cancellingId === parcel._id ? "Cancelling..." : "Cancel"}
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
