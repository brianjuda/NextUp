import { useState, useEffect } from "react";
import { useMedia } from "../hooks/hooks";
import { fetchTrending } from "../actions/search";
import { normalizeMediaItem } from "../actions/normalize";
import type { MediaItem } from "../types/types";
import MiniMovieList from './MiniMovieList';

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

    return (
        <div className="dashboard">
            <MiniMovieList listTitle={"In Progress TV shows"} listData={data.data.filter(item => item.media_type === "tv").filter(item => item.status !== "completed")} />
            <MiniMovieList listTitle={"Jump into a saved movie"} listData={data.data.filter(item => item.media_type === "movie").filter(item => item.status !== "completed")} />
            <MiniMovieList listTitle={"Trending this week"} listData={trending} />
        </div>
    )
}