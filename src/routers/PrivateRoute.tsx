import { Navigate } from "react-router";
import { useAuth } from "../hooks/context";
import type { ReactNode } from "react";

export default function PrivateRoute({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;
    return user ? children : <Navigate to="/login" />;
}