import { useState, useEffect } from "react";
import { useMedia } from "../hooks/context";
import { fetchTrending } from "../actions/search";
import { normalizeMediaItem } from "../actions/normalize";
import type { MediaItem } from "../types/types";
import MovieList from "./MovieList";
// import MiniMovieList from './MiniMovieList';

export default function HomeDashboardPage () {
    const data = useMedia();
    const [trending, setTrending] = useState<MediaItem[]>([])

    useEffect(() => {
        const getTrending = async () => {
            try {
                const results = await fetchTrending();
                const normalized = results.map(normalizeMediaItem);
                setTrending(normalized);
            } catch (error) {
                console.error("Failed to fetch trending media", error);
            }
        };

        getTrending();
    }, [])

    const inProgressTV = data.data.filter((item) => item.media_type === "tv" && item.status !== "completed");
    const inProgressMovies = data.data.filter((item) => item.media_type === "movie" && item.status !== "completed");

    return (
        <div className="dashboard">
            <MovieList listTitle="In Progress TV shows" listData={inProgressTV} mode="mini" />
            <MovieList listTitle="Jump into a saved movie" listData={inProgressMovies} mode="mini" />
            <MovieList listTitle="Trending this week" listData={trending} mode="trending" />
        </div>
    )
}