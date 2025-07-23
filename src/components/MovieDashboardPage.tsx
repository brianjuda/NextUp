import FullMovieList from "./FullMovieList";
import { useMedia } from "../hooks/hooks";

export default function MovieDashboardPage() {
    const { data } = useMedia();

    return (
        <div className="dashboard">
            <FullMovieList 
                listTitle={"Movies"} 
                listData={data.filter(item => item.media_type === "movie")} 
            />
        </div>
    );
}