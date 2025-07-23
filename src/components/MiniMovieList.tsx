import MiniMovieCard from './MiniMovieCard';
import type { MediaItem } from '../types/types';


interface MiniMovieListProps {
    listTitle: string;
    listData: Array<MediaItem>;
}

export default function MiniMovieList ({ listTitle, listData }: MiniMovieListProps) {
    return (
        <div className="row-list">
            <h2 className="movie-list__title">{listTitle}</h2>
            <div className="movie-list">
                {
                    listData.map((movie: MediaItem) => (
                        <MiniMovieCard key={movie.id}
                            name={movie.title}
                            image={movie.posterPath}
                            year={movie.year}
                            genre={movie.genre}
                        />
                    ))
                }
            </div>
        </div>
    )
}