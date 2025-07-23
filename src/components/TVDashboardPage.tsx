import FullMovieList from "./FullMovieList";
import { useMedia } from "../hooks/hooks";

export default function TVDashboardPage() {
    const { data } = useMedia();

    return (
        <div className="dashboard">
            <FullMovieList 
                listTitle={"TV shows"} 
                listData={data.filter(item => item.media_type === "tv")} 
            />
        </div>
    )
}