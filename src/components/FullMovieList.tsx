import FullMovieCard from "./FullMovieCard";
import type { MediaItem } from '../types/types';

interface TVListProps {
    listTitle: string;
    listData: Array<MediaItem>;
}

export default function FullMovieList ({ listTitle, listData }: TVListProps)  {
    return (
        <div className="row-list">
            <h2 className="movie-list__title">{listTitle}</h2>
            <div className="movie-list--full">
                {
                    listData.map((movie: MediaItem) => (
                        <FullMovieCard key={movie.id}
                            {...movie}
                        />
                    ))
                }
            </div>
        </div>
    )
}