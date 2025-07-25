import { useMedia } from "../hooks/context";
import type { MediaItem } from "../types/types";
import MovieCardStatus from "./MovieCardStatus";

type MovieCardProps = MediaItem & {
    mode: "mini" | "search" | "watchlist" | "trending" ;
    backdropPath?: string;
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
    backdropPath,
}: MovieCardProps) {
    const { data, addMedia } = useMedia();

    const isInWatchlist = data.some(item => item.id === id && item.media_type === media_type);
    const mediaItem = data.find(item => item.id === id && item.media_type === media_type);
    const currentStatus = mediaItem?.status ?? "toWatch";

    // Prefer backdropPath for hero image, fallback to posterPath
    const heroImage = backdropPath
        ? `https://image.tmdb.org/t/p/w342${backdropPath}`
        : posterPath
            ? `https://image.tmdb.org/t/p/w342${posterPath}`
            : null;

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
                {heroImage ? (
                    <img className="movie-card__hero-img" src={heroImage} alt={title} />
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