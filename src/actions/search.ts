const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function searchMedia(query: string) {
    const res = await fetch(`${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&region=US&sort_by=popularity.desc&api_key=${API_KEY}`)

    if(!res.ok) {
        throw new Error(`TMDB search failed: ${res.statusText}`);
    }

    const data = await res.json();

    //filter out results that are not movies or TV
    return data.results.filter((item: any) => item.media_type === "movie" || item.media_type === "tv");
}

export async function fetchTrending() {
    const res = await fetch(`${BASE_URL}/trending/all/week?language=en-US&api_key=${API_KEY}`);

    if (!res.ok) {
        throw new Error (`TMDB trending failed: ${res.statusText}`);
    }

    const data = await res.json();

    //filter out results that are not movies or TV
    return data.results.filter((item: any) => item.media_type === "movie" || item.media_type === "tv");
}