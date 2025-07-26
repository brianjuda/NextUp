import type { AuthState, AuthAction } from "../types/types";

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