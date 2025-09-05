/* eslint-disable @typescript-eslint/no-explicit-any */

import { useGetAllParcelsQuery } from "@/redux/features/parcel/parcel.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserPlus, Package, DollarSign } from "lucide-react";
import { useGetAllUsersQuery } from "@/redux/features/auth/auth.api";
import Spinner from "@/components/ui/Spinner";

export default function Analytics() {
  const { data: usersData, isLoading: isLoadingUsers } = useGetAllUsersQuery({});
  const { data: parcelsData, isLoading: isLoadingParcels } = useGetAllParcelsQuery({ page: 1, limit: 100 });

  const users = usersData?.data || [];
  const parcels = parcelsData?.data || [];


  const senders = users.filter((u: any) => u.role === "SENDER");
  const receivers = users.filter((u: any) => u.role === "RECEIVER");


  const totalRevenue = parcels.reduce(
    (sum: number, parcel: any) => sum + (parcel.fee || 0),
    0
  );

  const cards = [
    {
      title: "Total Users",
      value: users.length,
      icon: <Users className="w-8 h-8 text-blue-500" />,
      color: "bg-blue-100 dark:bg-blue-900",
    },
    {
      title: "Senders",
      value: senders.length,
      icon: <UserCheck className="w-8 h-8 text-green-500" />,
      color: "bg-green-100 dark:bg-green-900",
    },
    {
      title: "Receivers",
      value: receivers.length,
      icon: <UserPlus className="w-8 h-8 text-purple-500" />,
      color: "bg-purple-100 dark:bg-purple-900",
    },
    {
      title: "Total Parcels",
      value: parcels.length,
      icon: <Package className="w-8 h-8 text-orange-500" />,
      color: "bg-orange-100 dark:bg-orange-900",
    },
    {
      title: "Revenue",
      value: `$${totalRevenue}`,
      icon: <DollarSign className="w-8 h-8 text-yellow-500" />,
      color: "bg-yellow-100 dark:bg-yellow-900",
    },
  ];



  if (isLoadingUsers || isLoadingParcels) {
    return <Spinner />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Analytics Dashboard</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, idx) => (
          <Card
            key={idx}
            className={`shadow-md rounded-2xl ${card.color} transition hover:scale-105`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">
                {card.title}
              </CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
