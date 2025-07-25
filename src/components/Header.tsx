import { NavLink } from 'react-router';
import SearchBar from './SearchBar';

export default function Header () {
    return (
        <header className="header">
        <div className="content-container">
            <div className="header__content">
                <div className="header__title" >
                    <h1>NextUp</h1>
                </div>
                <div className="header__links">
                    <NavLink to="/">
                        Home
                    </NavLink>
                    <NavLink to="/tv">
                        TV shows
                    </NavLink>
                    <NavLink to="/movies">
                        Movies
                    </NavLink>
                </div>
                <SearchBar />
            </div>
        </div>
    </header>
    )
}