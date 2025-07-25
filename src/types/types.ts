import type { AuthAction } from "../reducers/auth";

type MediaType = "movie" | "tv";
export type WatchStatus = "toWatch" | "watching" | "completed";

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

export interface AuthContextType {
    user: { uid: string } | null; // Adjust the user type as per your Firebase user object
    loading: boolean;
    dispatch: React.Dispatch<AuthAction>;
}