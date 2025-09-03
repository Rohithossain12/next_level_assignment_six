/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetIncomingParcelsQuery } from "@/redux/features/parcel/parcel.api";
import Spinner from "./ui/Spinner";
import { CheckCircle } from "lucide-react";

const statuses = [
  "REQUESTED",
  "APPROVED",
  "DISPATCHED",
  "IN_TRANSIT",
  "DELIVERED",
  "RETURNED",
  "CANCELED",
];

const TrackParcel = () => {
  const { data, isLoading, isError } = useGetIncomingParcelsQuery(undefined);

  const parcels = data?.data || [];

  if (isLoading) return <Spinner />;
  if (isError) return <p className="text-red-500">Failed to load parcels</p>;

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Track Parcel</h1>

      {parcels.map((parcel: any) => {
        const currentStatus =
          parcel?.statusLogs[parcel.statusLogs.length - 1]?.status;

        return (
          <div
            key={parcel._id}
            className="mb-10 p-4 border rounded-xl shadow-sm dark:border-gray-700"
          >
         
            <div className="mb-4">
              <p className="font-semibold">
                Tracking ID:{" "}
                <span className="text-blue-500">{parcel.trackingId}</span>
              </p>
              <p className="font-medium text-gray-700 dark:text-gray-300">
                Parcel Type:{" "}
                <span className="text-green-600 dark:text-green-400">
                  {parcel.type}
                </span>
              </p>
            </div>

        
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-6 md:space-y-0">
              {statuses.map((status, idx) => {
                const isCompleted =
                  statuses.indexOf(currentStatus) >= idx &&
                  currentStatus !== "CANCELED";

                return (
                  <div
                    key={status}
                    className="flex-1 flex flex-col "
                  >
                   
                    <div className="flex items-center w-full">
                      <div
                        className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition 
                          ${
                            isCompleted
                              ? "bg-green-500 border-green-500 text-white"
                              : "bg-gray-200 dark:bg-gray-700 border-gray-400 dark:border-gray-600"
                          }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <span className="text-sm font-bold text-gray-500 dark:text-gray-300">
                            {idx + 1}
                          </span>
                        )}
                      </div>

                     
                      {idx < statuses.length - 1 && (
                        <div
                          className={`flex-1 h-1 mx-2 transition
                          ${
                            statuses.indexOf(currentStatus) > idx &&
                            currentStatus !== "CANCELED"
                              ? "bg-green-500"
                              : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        />
                      )}
                    </div>

                    
                    <p className="mt-2 text-sm font-medium text-start">
                      {status}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrackParcel;
