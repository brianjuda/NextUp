import MovieList from "./MovieList";
import { useMedia } from "../hooks/hooks";

export default function TVDashboardPage() {
    const { data } = useMedia();

    return (
        <div className="dashboard">
            <MovieList 
                listTitle={"TV shows"} 
                listData={data.filter(item => item.media_type === "tv")} 
                mode="watchlist"
            />
        </div>
    )
}