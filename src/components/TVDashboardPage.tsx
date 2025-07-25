import MovieList from "./MovieList";
import MovieListFilters from "./MovieListFilters";
import useFilter from "../hooks/filters";

export default function TVDashboardPage() {
    const { filteredData, availableGenres, handleFilterChange } = useFilter("tv");

    return (
        <div className="dashboard">
            <MovieListFilters genres={availableGenres} onChange={handleFilterChange} />
            <MovieList 
                listTitle="TV shows"
                listData={filteredData} 
                mode="watchlist"
            />
        </div>
    )
}