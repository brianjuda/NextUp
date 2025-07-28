import { useState, useRef } from "react";
import { useNavigate } from "react-router";


const SearchBar = () => {
    const [isActive, setIsActive] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleIconClick = () => {
        setIsActive(true);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const handleBlur = () => {
        setIsActive(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!searchValue.trim()) return;

        navigate(`/search?query=${encodeURIComponent(searchValue.trim())}`);
    };

    return (
        <div className="header__search">
            <form onSubmit={handleSubmit}>
                {!isActive ? (
                    <button onClick={handleIconClick} aria-label="Search">
                        {/* Replace with your search icon */}
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                    </button>
                ) : (
                    <input
                        ref={inputRef}
                        type="text"
                        className="text-input"
                        placeholder="Search Movies/TV"
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        onBlur={handleBlur}
                        autoFocus
                    />
                )}
            </form>
        </div>
    )
};

export default SearchBar;