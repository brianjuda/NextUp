import { useMedia } from "../hooks/hooks";
import type { MediaItem } from "../types/types";
import MovieCardStatus from "./MovieCardStatus";

type MovieCardProps = MediaItem & {
    mode: "mini" | "search" | "watchlist" | "trending" ;
};

export default function MovieCard({
    id,
    title,
    posterPath,
    year,
    genre,
    media_type,
    status,
    overview,
    mode,
}: MovieCardProps) {
    const { data, addMedia } = useMedia();

    const posterImage = posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : null;

    const isInWatchlist = data.some(item => item.id === id && item.media_type === media_type)
    const mediaItem = data.find(item => item.id === id && item.media_type === media_type);
    const currentStatus = mediaItem?.status ?? "toWatch";

    const handleAddToWatchlist = () => {
        addMedia({
            id,
            title,
            posterPath,
            year,
            genre,
            media_type,
            status: "toWatch",
            overview
        });
    };

    return (
        <div className={(mode === "search" || mode === "trending" || mode === "watchlist") ? "movie-card--full" : "movie-card"}>
            {/* Hero Image */}
            <div className="movie-card__hero">
                {posterImage ? (
                    <img className="movie-card__hero-img" src={posterImage} alt={title} />
                ) : (
                    <div className="movie-card__hero-img placeholder" />
                )}
            </div>

            {/* Details */}
            <div className="movie-card__details">
                <h3>{title}</h3>
                <p>{genre} <span>&middot;</span> {year}</p>

                {/* Interactions */}
                {mode === "watchlist" && (
                    <div className="movie-card__interact">
                        <MovieCardStatus id={id} status={status} />
                    </div>
                )}

                {(mode === "search" || mode === "trending") && (
                    <div className="movie-card__interact">
                        {!isInWatchlist ? (
                            <button className="button" onClick={handleAddToWatchlist}>
                                Add to watchlist
                            </button>
                        ) : (
                            <MovieCardStatus id={id} status={currentStatus} />
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}