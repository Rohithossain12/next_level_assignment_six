/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllUsersQuery, useUpdateUserMutation } from "@/redux/features/auth/auth.api";
import { Pencil } from "lucide-react";
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
} from "@/components/ui/pagination"

import { toast } from "sonner";

const roles = ["SUPER_ADMIN", "ADMIN", "SENDER", "RECEIVER"];

export default function ManageUsers() {
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10)
    const { data, isLoading, isError } = useGetAllUsersQuery({ page: currentPage, limit });
    const [updateUser] = useUpdateUserMutation();


    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [role, setRole] = useState<string>("");

    if (isLoading) return <p className="p-4">Loading users...</p>;
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



    const totalPage = data?.meta?.totalPage || 1



    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Manage Users</h1>

            <div className="overflow-x-auto">
                <table className="w-full border  dark:border-gray-700  rounded-lg shadow-sm">
                    <thead>
                        <tr className="">
                            <th className="py-2 px-4 text-left">#</th>
                            <th className="py-2 px-4 text-left">Name</th>
                            <th className="py-2 px-4 text-left">Email</th>
                            <th className="py-2 px-4 text-left">Role</th>
                            <th className="py-2 px-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any, index: number) => (
                            <tr key={user._id} className="border-t">
                                <td className="py-2 px-4">{index + 1}</td>
                                <td className="py-2 px-4">{user.name}</td>
                                <td className="py-2 px-4">{user.email}</td>
                                <td className="py-2 px-4">{user.role}</td>
                                <td className="py-2 px-4 text-center">
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="p-2 rounded-full bg-rose-100"
                                    >
                                        <Pencil className="w-4 h-4 text-rose-500" />
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {users.length === 0 && (
                            <tr>
                                <td colSpan={5} className="py-4 text-center text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit Role Modal */}
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

            {
                totalPage > 1 && <div className="flex justify-end mt-2">
                    <div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious onClick={() => setCurrentPage((prev) => prev - 1)}
                                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>
                                {

                                    Array.from({ length: totalPage }, (_, index) => index + 1).map((page) => <PaginationItem key={page}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>
                                    </PaginationItem>)

                                }
                                <PaginationItem>
                                    <PaginationNext onClick={() => setCurrentPage((prev) => prev + 1)}
                                        className={currentPage === totalPage ? "pointer-events-none opacity-50" : "cursor-pointer"} />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            }
        </div>
    );
}
