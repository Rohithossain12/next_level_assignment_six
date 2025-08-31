import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (
    Component: ComponentType,
    requiredRole?: TRole | TRole[]
) => {
    return function AuthWrapper() {
        const { data, isLoading } = useUserInfoQuery(undefined);

        if (!isLoading && !data?.data?.email) {
            return <Navigate to="/login" />;
        }

        if (requiredRole && !isLoading) {
            const userRole = data?.data?.role as TRole;

            if (Array.isArray(requiredRole)) {

                if (!requiredRole.includes(userRole)) {
                    return <Navigate to="/unauthorized" />;
                }
            } else {

                if (userRole !== requiredRole) {
                    return <Navigate to="/unauthorized" />;
                }
            }
        }

        return <Component />;
    };
};
