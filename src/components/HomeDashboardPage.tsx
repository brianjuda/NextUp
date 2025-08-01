import { useState, useEffect } from "react";
import { useMedia } from "../hooks/context";
import { fetchTrendingMovies, fetchTrendingTV } from "../actions/search";
import { normalizeMediaItem } from "../actions/normalize";
import type { MediaItem } from "../types/types";
import MovieList from "./MovieList";

export default function HomeDashboardPage () {
    const data = useMedia();
    const [trendingMovies, setTrendingMovies] = useState<MediaItem[]>([]);
    const [trendingTV, setTrendingTV] = useState<MediaItem[]>([]);

    useEffect(() => {
        const getTrendingMovies = async () => {
            try {
                const results = await fetchTrendingMovies();
                const normalized = results.map(normalizeMediaItem);
                setTrendingMovies(normalized);
            } catch (error) {
                console.error("Failed to fetch trending movies", error);
            }
        };
        const getTrendingTV = async () => {
            try {
                const results = await fetchTrendingTV();
                const normalized = results.map(normalizeMediaItem);
                setTrendingTV(normalized);
            } catch (error) {
                console.error("Failed to fetch trending TV", error);
            }
        };
        
        getTrendingMovies();
        getTrendingTV();
    }, [])

    const inProgressTV = data.data.filter((item) => item.media_type === "tv" && item.status !== "completed");
    const inProgressMovies = data.data.filter((item) => item.media_type === "movie" && item.status !== "completed");

    return (
        <div className="dashboard">
            <MovieList listTitle="In Progress TV shows" listData={inProgressTV} mode="mini" />
            <MovieList listTitle="Jump into a saved movie" listData={inProgressMovies} mode="mini" />
            <MovieList listTitle="Trending Movies this week" listData={trendingMovies} mode="trending" />
            <MovieList listTitle="Trending TV this week" listData={trendingTV} mode="trending" />
        </div>
    )
}