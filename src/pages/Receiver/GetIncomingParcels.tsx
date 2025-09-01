/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetIncomingParcelsQuery, useConfirmDeliveryMutation } from "@/redux/features/parcel/parcel.api";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const statusTextColors: Record<string, string> = {
    REQUESTED: "text-blue-600 dark:text-blue-400",
    APPROVED: "text-teal-600 dark:text-teal-400",
    DISPATCHED: "text-yellow-600 dark:text-yellow-400",
    IN_TRANSIT: "text-indigo-600 dark:text-indigo-400",
    DELIVERED: "text-green-600 dark:text-green-400",
    CANCELED: "text-red-600 dark:text-red-400",
    RETURNED: "text-orange-600 dark:text-orange-400",
};

export default function GetIncomingParcels() {
    const { data, isLoading, isError } = useGetIncomingParcelsQuery(undefined);
    const [confirmDelivery] = useConfirmDeliveryMutation();

    if (isLoading) return <Spinner />;
    if (isError) return <p className="text-red-500">Failed to load parcels</p>;

    const handleConfirm = async (id: string) => {
        try {
            await confirmDelivery(id).unwrap();
            toast.success("Delivery confirmed successfully!");
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to confirm delivery");
        }
    };

    const parcels = data?.data || [];

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold text-center mb-4 dark:text-gray-100">
                My Incoming Parcels
            </h1>

            <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                <Table>
                    <TableHeader className="bg-gray-50 dark:bg-gray-800">
                        <TableRow>
                            <TableHead className="text-left">#</TableHead>
                            <TableHead className="text-left">Sender</TableHead>
                            <TableHead className="text-left">Type</TableHead>
                            <TableHead className="text-left">Weight</TableHead>
                            <TableHead className="text-left">Fee</TableHead>
                            <TableHead className="text-left">Status</TableHead>
                            <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {parcels.map((parcel: any, index: number) => {
                            const currentStatus = parcel.statusLogs?.length
                                ? parcel.statusLogs[parcel.statusLogs.length - 1].status
                                : "REQUESTED";

                            const canConfirm =
                                currentStatus === "IN_TRANSIT" || currentStatus === "DELIVERED";

                            return (
                                <TableRow key={parcel._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{parcel.sender?.name}</TableCell>
                                    <TableCell>{parcel.type}</TableCell>
                                    <TableCell>{parcel.weight} kg</TableCell>
                                    <TableCell>${parcel.fee}</TableCell>
                                    <TableCell className={`font-medium ${statusTextColors[currentStatus]}`}>
                                        {currentStatus}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Button
                                            size="sm"
                                            disabled={!canConfirm}
                                            onClick={() => handleConfirm(parcel._id)}
                                        >
                                            {currentStatus === "DELIVERED"
                                                ? "Delivered"
                                                : "Confirm"}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}

                        {parcels.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="text-center py-4 text-gray-500 dark:text-gray-400"
                                >
                                    No incoming parcels found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
