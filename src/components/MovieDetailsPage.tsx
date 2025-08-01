import { useParams } from "react-router";
import { useMedia }  from "../hooks/context";
import type { MediaItem, MediaType }  from "../types/types";
import MovieCardStatus from "./MovieCardStatus";

export default function MovieDetailsPage() {
    const { media_type, id } = useParams<{ media_type: string; id: string }>();

    const { data, addMedia } = useMedia();

    const new_id = id ? parseInt(id) : NaN;

    const mediaItem = data.find(item => item.id === new_id && item.media_type === media_type);

    if (!mediaItem) {
        return <div className="movie-details__error">Movie not found</div>;
    }

    const { title, posterPath, year, genre, overview, backdropPath } = mediaItem as MediaItem;


    const isInWatchlist = data.some(item => item.id === new_id && item.media_type === media_type);
    const currentStatus = mediaItem?.status ?? "toWatch";

    const heroImage = backdropPath ? `https://image.tmdb.org/t/p/original${backdropPath}` : posterPath ? `https://image.tmdb.org/t/p/original${posterPath}` : null;

    const handleAddToWatchlist = () => {
        addMedia({
            id: new_id,
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
        <div className="movie-details">
            {/* Hero Image */}
            <div className="movie-details__hero">
                {heroImage ? (
                    <img className="movie-details__hero-img" src={heroImage} alt={title} />
                ) : (
                    <div className="movie-details__hero-img placeholder" />
                )}
            </div>
            {/* Overview */}
            <div className="movie-detail__body">
                <div className="movie-details__overview">
                    <h1>{title} ({year})</h1>
                    <p>{media_type === 'movie' ? 'Movie' : 'TV'} <span>&middot;</span> {genre} <span>&middot;</span> {year}</p>
                    <p>{overview}</p>
                </div>
                <div className="movie-detail__interact">
                    {!isInWatchlist ? (
                        <button className="btn btn--primary" onClick={handleAddToWatchlist}>
                            Add to Watchlist
                        </button>
                    ) : (
                        <MovieCardStatus id={new_id} status={currentStatus} />
                    )}
                </div>
            </div>
        </div>
    )
}