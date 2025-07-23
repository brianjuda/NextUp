import type { User } from "firebase/auth";

export type AuthAction = 
    | { type: "LOGIN", user: User }
    | { type: "LOGOUT" }
    | { type: "SET_LOADING"; loading: boolean}

export default function authReducer (state = {}, action: AuthAction) {
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