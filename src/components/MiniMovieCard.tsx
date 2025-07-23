interface Movie {
    name: string;
    image: string;
    year: number;
    genre: string;
}

export default function MiniMovieCard ({ name, image, year, genre }: Movie) {
    const posterImage = 'https://image.tmdb.org/t/p/w500' + image;
    // const genre = genreData.genres.find((obj) => (obj.id === genreID));

    return (
        <div className="movie-card">
            {/* hero image */}
            <div className="movie-card__hero">
                {image ? (
                    <img className="movie-card__hero-img" src={posterImage} />
                ) : (
                    <div className="movie-card__hero-img placeholder" />
                )}
            </div>
            <div className="movie-card__details">
                {/* title */}
                <h3>{name}</h3>
                {/* details */}
                <p>{genre} <span>&middot;</span> {year}</p>
            </div>
        </div>
    )
}