import MovieCard from "./MovieCard";
import type { MediaItem } from "../types/types";

interface MovieListProps {
    listTitle: string;
    listData: Array<MediaItem>;
    mode: "mini" | "search" | "watchlist" | "trending" ;
}

export default function MovieList({ listTitle, listData, mode }: MovieListProps) {
    return (
        <div className="row-list">
            <h2 className="movie-list__title">{listTitle}</h2>
            <div className={(mode === "search" || mode === "watchlist") ? "movie-list--full" : "movie-list"}>
                {
                    listData.map((movie: MediaItem) => (
                        <MovieCard key={movie.id} mode={mode} {...movie} />
                    ))
                }
            </div>
        </div>
    )
}