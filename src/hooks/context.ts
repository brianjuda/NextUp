import { useContext } from "react";
import { MediaContext } from "../context/media";
import { AuthContext } from "../context/auth";

export const useMedia = () => {
    const context = useContext(MediaContext);
    if(!context) throw new Error("useMedia must be used within a MediaProvider");
    return context;
}

export const useAuth = () => useContext(AuthContext);