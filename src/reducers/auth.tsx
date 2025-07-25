import type { User } from "firebase/auth";

export type AuthState = {
    user: User | null;
    loading: boolean;
}

export type AuthAction = 
    | { type: "LOGIN", user: User }
    | { type: "LOGOUT" }
    | { type: "SET_LOADING"; loading: boolean}

export default function authReducer (state: AuthState, action: AuthAction) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.user,
                loading: false,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                loading: false,
            };
        case "SET_LOADING":
            return {
                ...state,
                loading: action.loading,
            };
        default:
            return state;
    }
};