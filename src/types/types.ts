import type { User } from "firebase/auth";

export type WatchStatus = "toWatch" | "watching" | "completed";
type MediaType = "movie" | "tv";

export interface MediaItem {
    id: number;
    media_type: MediaType;
    title: string;
    posterPath: string;
    backdropPath?: string;
    genre: string;
    year: number;
    overview: string;
    status: WatchStatus
}

export interface MediaState {
    data: MediaItem[];
}

export type AuthState = {
    user: User | null;
    loading: boolean;
}

export type AuthAction = 
    | { type: "LOGIN", user: User }
    | { type: "LOGOUT" }
    | { type: "SET_LOADING"; loading: boolean}



export type AuthContextType = {
    user: User | null;
    loading: boolean;
    dispatch: React.Dispatch<AuthAction>
}