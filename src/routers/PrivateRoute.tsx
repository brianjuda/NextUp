import { Navigate } from "react-router";
import { useAuth } from "../hooks/hooks";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;
    return user ? children : <Navigate to="/login" />;
}