import { useEffect, useState } from "react";
import { useLocation } from "react-router"
import { searchMedia } from "../actions/search";
import { normalizeMediaItem } from "../actions/normalize";
import SearchMovieCard from "./SearchMovieCard";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SearchDashboardPage() {
    const query = useQuery().get("query");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!query) return;

        setLoading(true);
        searchMedia(query)
            .then(data => {
                const normalized = data.map(normalizeMediaItem);
                setResults(normalized);
            })
            .catch(err => console.error("Search error:", err))
            .finally(() => setLoading(false));
    }, [query]);

    return (
        <div className="dashboard">
            <h2 className="movie-list__title">"{query}"</h2>
            {loading && <p>Loading...</p>}
            {!loading && results.length === 0 && <p>No results found.</p>}
            <div className="search-results">
                {results.map(item => (
                    <SearchMovieCard 
                        key={item.id} 
                        {...item}
                    />
                ))}
            </div>
        </div>
    )
}