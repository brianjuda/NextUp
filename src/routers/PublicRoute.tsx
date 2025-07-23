import { Navigate } from "react-router";
import { useAuth } from "../hooks/hooks";

export default function PublicRoute({ children }: { children: JSX.Element }) {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;
    return user ? <Navigate to="/dashboard" /> : children;
}