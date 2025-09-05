/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllUsersQuery, useUpdateUserMutation } from "@/redux/features/auth/auth.api";
import { Pencil, RotateCcw } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { toast } from "sonner";
import Spinner from "@/components/ui/Spinner";

const roles = ["SUPER_ADMIN", "ADMIN", "SENDER", "RECEIVER"];

export default function ManageUsers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);


  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const { data, isLoading, isError } = useGetAllUsersQuery({
    page: currentPage,
    limit,
    searchTerm: searchTerm || undefined,
    role: roleFilter || undefined,
  });

  const [updateUser] = useUpdateUserMutation();

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [role, setRole] = useState<string>("");

  if (isLoading) return <Spinner />;
  if (isError) return <p className="p-4 text-red-500">Failed to load users</p>;

  const users = data?.data || [];

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setRole(user.role);
    setOpen(true);
  };

  const handleSave = async () => {
    if (!selectedUser) return;
    try {
      const res = await updateUser({ id: selectedUser._id, data: { role } }).unwrap();
      toast.success(res.message);
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update role ");
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setRoleFilter("");
    setCurrentPage(1);
  };

  const totalPage = data?.meta?.totalPage || 1;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold  mb-6 text-gray-900 dark:text-gray-100">
        Manage Users
      </h1>


      <div className="flex flex-col sm:flex-row gap-3 mb-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search by name, email, or address..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-1/3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        />

        <Select
          value={roleFilter}
          onValueChange={(value) => {
            setRoleFilter(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={handleReset}
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </Button>
      </div>

      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="py-3 px-4 text-left font-medium text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">
                #
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">
                Name
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">
                Email
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">
                Role
              </th>
              <th className="py-3 px-4 text-center font-medium text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user: any, index: number) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                  {(currentPage - 1) * limit + index + 1}
                </td>
                <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                  {user.name}
                </td>
                <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                  {user.email}
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleEdit(user)}
                    className="p-2 rounded-full bg-rose-100 dark:bg-rose-900 hover:bg-rose-200 dark:hover:bg-rose-800 transition-colors"
                  >
                    <Pencil className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit User Role</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p>
              <span className="font-medium">User:</span>{" "}
              {selectedUser?.name} ({selectedUser?.email})
            </p>
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex justify-end mt-4">
        {totalPage > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                (page) => (
                  <PaginationItem
                    key={page}
                    onClick={() => setCurrentPage(page)}
                  >
                    <PaginationLink isActive={currentPage === page}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className={
                    currentPage === totalPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
