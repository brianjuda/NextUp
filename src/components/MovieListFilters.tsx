import { useState } from "react";

type MovieFiltersProps = {
    genres: string[];
    onChange: (filters: {genre: string; status: string }) => void;
}

export default function MovieListFilters({ genres, onChange }: MovieFiltersProps) {
    const [genreFilter, setGenreFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setGenreFilter(value);
        onChange({ genre: value, status: statusFilter});
    }

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setStatusFilter(value);
        onChange({ genre: genreFilter, status: value });
    }

    return (
        <div className="movie-filters">
            <select value={genreFilter} onChange={handleGenreChange}>
                <option value="">All genres</option>
                {genres.map((genre) => (
                    <option key={genre} value={genre}>
                        {genre}
                    </option>
                ))}
            </select>

            <select value={statusFilter} onChange={handleStatusChange}>
                <option value="">All status</option>
                <option value="toWatch">On watchlist</option>
                <option value="watching">In Progress</option>
                <option value="completed">Completed</option>
            </select>
        </div>

    )
}