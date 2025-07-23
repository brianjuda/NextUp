import { createContext } from "react";
import type { User } from "firebase/auth";


type AuthContextType = {
    user: User | null;
    loading: boolean;
    dispatch: React.Dispatch<
        | { type: "LOGIN"; user: User }
        | { type: "LOGOUT" }
        | { type: "SET_LOADING"; loading: boolean}
    >
}

export const AuthContext = createContext<AuthContextType>({ 
    user: null, 
    loading: true ,
    dispatch: () => {}
});