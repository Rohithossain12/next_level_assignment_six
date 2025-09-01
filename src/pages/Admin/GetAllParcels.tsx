/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  useGetAllParcelsQuery,
  useUpdateParcelStatusMutation,
  useBlockParcelMutation,
} from "@/redux/features/parcel/parcel.api";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { toast } from "sonner";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { ParcelStatus } from "@/types/parcel.type";
import { ParcelStatusValues } from "@/types/parcel.type";
import Spinner from "@/components/ui/Spinner";


const statusTextColors: Record<string, string> = {
  REQUESTED: "text-blue-600 dark:text-blue-400",
  APPROVED: "text-teal-600 dark:text-teal-400",
  DISPATCHED: "text-yellow-600 dark:text-yellow-400",
  IN_TRANSIT: "text-indigo-600 dark:text-indigo-400",
  DELIVERED: "text-green-600 dark:text-green-400",
  CANCELED: "text-red-600 dark:text-red-400",
  RETURNED: "text-orange-600 dark:text-orange-400",
};

const GetAllParcels = () => {
  const { data, isLoading, isError } = useGetAllParcelsQuery(undefined);
  const [updateStatus] = useUpdateParcelStatusMutation();
  const [blockParcel] = useBlockParcelMutation();

  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [blockedIds, setBlockedIds] = useState<string[]>([]); 
  const handleStatusChange = async (id: string, status: ParcelStatus) => {
    try {
      setUpdatingId(id);
      await updateStatus({ id, data: { status } }).unwrap();
      toast.success("Status updated successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleBlock = async (id: string) => {
    try {
      await blockParcel(id).unwrap();
      toast.success("Parcel blocked successfully");
      setBlockedIds((prev) => [...prev, id]); 
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to block parcel");
    }
  };

  if (isLoading) return <Spinner />;
  if (isError) return <p className="text-red-500">Failed to load parcels</p>;

  return (
    <div className="p-3">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">All Parcels</h1>
      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <TableHeader className="bg-gray-50 dark:bg-gray-800">
            <TableRow>
              <TableHead className="text-left text-gray-700 dark:text-gray-200">#</TableHead>
              <TableHead className="text-left text-gray-700 dark:text-gray-200">Sender</TableHead>
              <TableHead className="text-left text-gray-700 dark:text-gray-200">Receiver</TableHead>
              <TableHead className="text-left text-gray-700 dark:text-gray-200">Status</TableHead>
              <TableHead className="text-left text-gray-700 dark:text-gray-200">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {data?.data?.map((parcel: any, index: number) => {
              const currentStatus = parcel.statusLogs?.length
                ? parcel.statusLogs[parcel.statusLogs.length - 1].status
                : "REQUESTED";

              const isCanceled = currentStatus === "CANCELED";
              const isBlocked = blockedIds.includes(parcel._id);

              return (
                <TableRow key={parcel._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <TableCell className="px-4 py-3 text-gray-900 dark:text-gray-100">{index + 1}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-900 dark:text-gray-100">{parcel.sender?.name}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-900 dark:text-gray-100">{parcel.receiver?.name}</TableCell>
                  <TableCell className={`px-4 py-3 font-medium ${statusTextColors[currentStatus]}`}>
                    {currentStatus}
                  </TableCell>
                  <TableCell className="px-4 py-3 flex gap-10"> 
                    <Select
                      onValueChange={(value) =>
                        handleStatusChange(parcel._id, value as ParcelStatus)
                      }
                      defaultValue={currentStatus}
                      disabled={updatingId === parcel._id || isCanceled || isBlocked} 
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Update Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(ParcelStatusValues)
                          .filter(status => status !== "CANCELED")
                          .map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <Button
                      size="sm"
                      onClick={() => handleBlock(parcel._id)}
                      disabled={isCanceled || isBlocked} 
                      variant={isBlocked ? "outline" : "default"}
                    >
                      {isBlocked ? "Blocked" : "Block"}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GetAllParcels;
