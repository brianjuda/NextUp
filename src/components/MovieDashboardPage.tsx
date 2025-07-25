import MovieList from "./MovieList";
import MovieListFilters from "./MovieListFilters";
import useFilter from "../hooks/filters";

export default function MovieDashboardPage() {
    const { filteredData, availableGenres, handleFilterChange } = useFilter("movie");

    return (
        <div className="dashboard">
            <MovieListFilters genres={availableGenres} onChange={handleFilterChange} />
            <MovieList 
                listTitle="Movies"
                listData={filteredData} 
                mode="watchlist"
            />
        </div>
    );
}