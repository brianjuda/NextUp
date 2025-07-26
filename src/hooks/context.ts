import { useContext } from "react";
import { MediaContext } from "../context/media";
import { AuthContext } from "../context/auth";
import type { AuthContextType } from "../types/types";

export const useMedia = () => {
    const context = useContext(MediaContext);
    if(!context) throw new Error("useMedia must be used within a MediaProvider");
    return context;
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};