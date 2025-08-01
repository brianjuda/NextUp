import type { MediaItem } from "../types/types"

const GENRE_ID_MAP: Record<number, string> = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
    10765: "Sci-Fi & Fantasy",
    10759: "Action & Adventure",
    10766: "Soap",
    10768: "War & Politics",
    10767: "Talk",
    10763: "News",
    10764: "Reality",
};

export function normalizeMediaItem(raw: any, param_type?: MediaType): MediaItem {
    const {
        id,
        media_type,
        title,
        name,
        poster_path,
        backdrop_path,
        genres,
        genre_ids,
        first_air_date,
        release_date,
        overview
    } = raw;

    const res_type = param_type || media_type;

    const genre = genres?.length ? genres[0].name : genre_ids?.length ? GENRE_ID_MAP[genre_ids[0]] || "Unknown" : "Unknown";
    const yearString = res_type === "tv" ? first_air_date : release_date;
    const year = yearString ? parseInt(yearString.split("-")[0]) : 0;

    return {
        id,
        media_type: res_type,
        title: res_type === "tv" ? name : title,
        posterPath: poster_path ?? "",
        backdropPath: backdrop_path ?? "",
        genre,
        status: "toWatch", //default status when added from search
        year,
        overview: overview ?? ""
    }
}