
import type { MediaItem } from "../types/types";
import { useMedia } from "../hooks/context";
import MovieCardStatus from "./MovieCardStatus";


export default function SearchMovieCard({ id, title, posterPath, backdropPath, year, genre, media_type, overview }: MediaItem) {
    // Prefer backdropPath for hero image, fallback to posterPath
    const heroImage = backdropPath
        ? `https://image.tmdb.org/t/p/w342${backdropPath}`
        : posterPath
            ? `https://image.tmdb.org/t/p/w342${posterPath}`
            : null;

    const { data, addMedia } = useMedia();

    const isInWatchlist = data.some(item => item.id === id && item.media_type === media_type)
    const mediaItem = data.find(item => item.id === id && item.media_type === media_type);
    const currentStatus = mediaItem?.status ?? "toWatch";

    const handleAddToWatchlist = () => {
        addMedia({
            id,
            title,
            posterPath,
            backdropPath,
            year,
            genre,
            media_type,
            status: "toWatch",
            overview
        })
    }

    return (
        <div className="movie-card--full">
            {/* hero image */}
            <div className="movie-card__hero">
                {heroImage ? (
                    <img className="movie-card__hero-img" src={heroImage} />
                ) : (
                    <div className="movie-card__hero-img placeholder" />
                )}
            </div>
            <div className="movie-card__details">
                {/* title */}
                <h3>{title}</h3>
                {/* details */}
                <p>{genre} <span>&middot;</span> {year}</p>
                {/* cta */} 
                <div className="movie-card__interact">
                    { !isInWatchlist && (
                        <button className="button" onClick={handleAddToWatchlist}>Add to watchlist</button>
                    )}
                    { isInWatchlist && (<MovieCardStatus id={id} status={currentStatus} />) }
                </div>
            </div>
        </div>
    )
}