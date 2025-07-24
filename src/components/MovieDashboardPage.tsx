import MovieList from "./MovieList";
import { useMedia } from "../hooks/hooks";

export default function MovieDashboardPage() {
    const { data } = useMedia();

    return (
        <div className="dashboard">
            <MovieList 
                listTitle="Movies"
                listData={data.filter(item => item.media_type === "movie")} 
                mode="watchlist"
            />
        </div>
    );
}