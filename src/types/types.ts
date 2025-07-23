type MediaType = "movie" | "tv";
export type WatchStatus = "toWatch" | "watching" | "completed";

export interface MediaItem {
    id: number;
    media_type: MediaType;
    title: string;
    posterPath: string;
    genre: string;
    year: number;
    overview: string;
    status: WatchStatus
}

export interface MediaState {
    data: MediaItem[];
}