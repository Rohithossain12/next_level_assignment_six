/* eslint-disable @typescript-eslint/no-explicit-any */


import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useCreateParcelMutation } from "@/redux/features/parcel/parcel.api";
import { useGetAllUsersQuery } from "@/redux/features/auth/auth.api";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";


const formSchema = z.object({
    type: z.string().min(1, "Parcel type is required"),
    weight: z.coerce.number().positive("Weight must be positive"),
    fee: z.coerce.number().nonnegative("Fee must be 0 or more"),
    receiver: z.string().min(1, "Receiver is required"),
    pickupAddress: z.string().min(1, "Pickup address required"),
    deliveryAddress: z.string().min(1, "Delivery address required"),
});

type CreateParcelFormValues = z.infer<typeof formSchema>;

export default function CreateParcel() {
    const [createParcel, { isLoading }] = useCreateParcelMutation();
    const { data: usersResponse } = useGetAllUsersQuery({});


    const users =
        usersResponse?.data.filter((u: any) => u.role === "RECEIVER") || [];


    const form = useForm<CreateParcelFormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            type: "",
            weight: 0,
            fee: 0,
            receiver: "",
            pickupAddress: "",
            deliveryAddress: "",
        },
    });


    const onSubmit: SubmitHandler<CreateParcelFormValues> = async (values) => {
        console.log(values);
        try {
            await createParcel(values).unwrap();
            toast.success(" Parcel created successfully!");
            form.reset();
        } catch (err: any) {
            toast.error(err?.data?.message || " Failed to create parcel");
        }
    };

    return (
        <Card className="w-full max-w-3xl mx-auto mt-10 shadow-lg rounded-2xl">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">
                    Create New Parcel
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Parcel Type</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Document, Electronics..." />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="weight"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Weight (kg)</FormLabel>
                                        <FormControl>
                                            <Input type="number" step="0.1" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="fee"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Delivery Fee</FormLabel>
                                        <FormControl>
                                            <Input type="number" step="0.01" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="receiver"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Receiver</FormLabel>
                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select receiver" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {users.map((user: any) => (
                                                    <SelectItem key={user._id} value={user._id}>
                                                        {user._id}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="pickupAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pickup Address</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Dhaka, Bangladesh" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="deliveryAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Delivery Address</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Chattogram, Bangladesh" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                       
                        <Button
                            type="submit"
                            className="w-full mt-5"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating..." : "Create Parcel"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
