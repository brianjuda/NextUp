import { useState } from "react";
import { useNavigate } from "react-router";


export default function SearchBar() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!query.trim()) return;

        navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    };

    return (
        <div className="header__search">
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    className="text-input"
                    placeholder="Search Movies/TV"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </form>
        </div>
    )
}