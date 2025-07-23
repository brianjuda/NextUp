import FullMovieCardStatus from "./FullMovieCardStatus";
import type { MediaItem } from "../types/types";
// import { useMedia } from "../hooks/hooks";


export default function FullMovieCard({ id, title, posterPath, year, genre, status }: MediaItem) {
    const posterImage = 'https://image.tmdb.org/t/p/w500' + posterPath;

    return (
        <div className="movie-card--full">
            {/* hero image */}
            <div className="movie-card__hero">
                {posterPath ? (
                    <img className="movie-card__hero-img" src={posterImage} />
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
                    <FullMovieCardStatus id={id} status={status} />
                </div>
            </div>
        </div>
    )
}