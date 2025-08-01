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

export async function fetchTrendingMovies() {
    const res = await fetch(`${BASE_URL}/trending/movie/week?language=en-US&api_key=${API_KEY}`);

    if (!res.ok) {
        throw new Error(`TMDB trending movies failed: ${res.statusText}`);
    }

    const data = await res.json();

    //filter out results that are not movies
    return data.results;
}

export async function fetchTrendingTV() {
    const res = await fetch(`${BASE_URL}/trending/tv/week?language=en-US&api_key=${API_KEY}`);

    if (!res.ok) {
        throw new Error(`TMDB trending TV failed: ${res.statusText}`);
    }

    const data = await res.json();

    //filter out results that are not TV
    return data.results;
}