import { useState, useEffect }  from "react";
import { useParams } from "react-router";
import { useMedia }  from "../hooks/context";
import type { MediaItem, MediaType }  from "../types/types";
import MovieCardStatus from "./MovieCardStatus";
import { fetchDetails } from "../actions/search";

export default function MovieDetailsPage() {
    const { media_type, id } = useParams<{ media_type: string; id: string }>();
    const mediaType = media_type as MediaType;
    const new_id = id ? parseInt(id) : NaN;
    
    const { data, addMedia } = useMedia();

    const [mediaItem, setMediaItem] = useState<MediaItem | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (data.find(item => item.id === new_id && item.media_type === media_type)) {
            setMediaItem(data.find(item => item.id === new_id && item.media_type === media_type) || null);
        } else {
            setLoading(true);
            setError(null);
            fetchDetails(mediaType, new_id)
                .then(item => setMediaItem(item))
                .catch(err => setError(`Failed to fetch details: ${err.message}`))
                .finally(() => setLoading(false));
        }
    }, [])

    if (loading) {
        return <div className="movie-details__loading">Loading...</div>;
    }

    if (error) {
        return <div className="movie-details__error">{error}</div>;
    }

    if (!mediaItem) {
        return <div className="movie-details__error">Movie not found</div>;
    }

    const { title, posterPath, year, genre, overview, backdropPath } = mediaItem;


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
            media_type: mediaType,
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
            <div className="movie-details__body">
                <div className="movie-details__overview">
                    <h1>{title}</h1>
                    <p>{media_type === 'movie' ? 'Movie' : 'TV'} <span>&middot;</span> {genre} <span>&middot;</span> {year}</p>
                    <p>{overview}</p>
                </div>
                <div className="movie-details__interact">
                    {!isInWatchlist ? (
                        <button className="button" onClick={handleAddToWatchlist}>
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