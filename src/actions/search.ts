import type { MediaType } from "../types/types";
import { normalizeMediaItem } from "./normalize";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function searchMedia(query: string) {
    const res = await fetch(`${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&region=US&sort_by=popularity.desc&api_key=${API_KEY}`)

    if(!res.ok) {
        throw new Error(`TMDB search failed: ${res.statusText}`);
    }

    const data = await res.json();
    const normalized = data.results.filter((item: any) => item.media_type === "movie" || item.media_type === "tv").map(normalizeMediaItem);

    return normalized;
}

export async function fetchTrendingMovies() {
    const res = await fetch(`${BASE_URL}/trending/movie/week?language=en-US&api_key=${API_KEY}`);

    if (!res.ok) {
        throw new Error(`TMDB trending movies failed: ${res.statusText}`);
    }

    const data = await res.json();
    const normalized = data.results.map(normalizeMediaItem);

    return normalized;
}

export async function fetchTrendingTV() {
    const res = await fetch(`${BASE_URL}/trending/tv/week?language=en-US&api_key=${API_KEY}`);

    if (!res.ok) {
        throw new Error(`TMDB trending TV failed: ${res.statusText}`);
    }

    const data = await res.json();
    const normalized = data.results.map(normalizeMediaItem);

    return normalized;
}

export async function fetchDetails( media_type: MediaType, id: number ) {
    const res = await fetch(`${BASE_URL}/${media_type}/${id}?language=en-US&api_key=${API_KEY}`);

    if (!res.ok) {
        throw new Error(`TMDB details fetch failed: ${res.statusText}`);
    }

    const data = await res.json();
    const normalized = normalizeMediaItem(data);

    return normalized;
}