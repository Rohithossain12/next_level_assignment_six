/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react";
import { useUserInfoQuery, useUpdateMyProfileMutation } from "@/redux/features/auth/auth.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import Spinner from "@/components/ui/Spinner";

const Profile = () => {
  const { data, isLoading } = useUserInfoQuery(undefined);
  const [updateMyProfile, { isLoading: isUpdating }] = useUpdateMyProfileMutation();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (data?.data) {
      setFormData({
        name: data.data.name || "",
        phone: data.data.phone || "",
        address: data.data.address || "",
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      await updateMyProfile(formData).unwrap();
      toast.success("Profile updated successfully!");
      setOpenModal(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen   py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 border rounded-2xl overflow-hidden md:flex">

          <div className="md:w-1/3 bg-gray-50 dark:bg-gray-800 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-600">
            <div className="w-32 h-32 rounded-full bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white text-4xl font-semibold mb-4 ring-4 ring-indigo-300 dark:ring-indigo-400">
              {data?.data?.name?.[0] || "U"}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-4 text-center">{data?.data?.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">{data?.data?.email}</p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <span className="bg-indigo-100 dark:bg-indigo-600 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-sm font-medium">
                {data?.data?.role}
              </span>
              <span className="bg-green-100 dark:bg-green-600 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                {data?.data?.isActive} {data?.data?.isVerified ? "(Verified)" : ""}
              </span>
            </div>
          </div>


          <div className="md:w-2/3 p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">Profile Details</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</p>
                  <p className="text-lg font-normal text-gray-800 dark:text-gray-200 mt-1">{data?.data?.phone || "Not set"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</p>
                  <p className="text-lg font-normal text-gray-800 dark:text-gray-200 mt-1">{data?.data?.address || "Not set"}</p>
                </div>
              </div>
            </div>


            <div className="mt-8 md:mt-12 flex justify-end">
              <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogTrigger asChild>
                  <Button className="w-full md:w-auto px-6 py-3 font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105">
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">Update Your Profile</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 mt-4">
                    <div>
                      <label htmlFor="name" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Name</label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} className="w-full" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Phone</label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+8801XXXXXXXXX" className="w-full" />
                    </div>
                    <div>
                      <label htmlFor="address" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Address</label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSubmit} disabled={isUpdating} className="w-full mt-4">
                      {isUpdating ? "Updating..." : "Save Changes"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;