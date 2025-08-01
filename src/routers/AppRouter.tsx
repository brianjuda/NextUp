import { BrowserRouter, Route, Routes } from 'react-router';
import Header from '../components/Header';
import LoginPage from '../components/LoginPage';
import HomeDashboardPage from '../components/HomeDashboardPage';
import TVDashboardPage from '../components/TVDashboardPage';
import MovieDashboardPage from '../components/MovieDashboardPage';
import SearchDashboardPage from '../components/SearchDashboardPage';
import MovieDetailsPage from '../components/MovieDetailsPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';


export default function AppRouter () {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                } />
                <Route path="/login" element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                } />
                <Route path="/dashboard" element={
                    <PrivateRoute>
                        <HomeDashboardPage />
                    </PrivateRoute>
                } />
                <Route path="/tv" element={
                    <PrivateRoute>
                        <TVDashboardPage />
                    </PrivateRoute>
                } />
                <Route path="/movies" element={
                    <PrivateRoute>        
                        <MovieDashboardPage />
                    </PrivateRoute>
                } />
                <Route path="/search" element={
                    <PrivateRoute>
                        <SearchDashboardPage />
                    </PrivateRoute>
                } />
                <Route path="/details/:media_type/:id" element={
                    <PrivateRoute>
                        <MovieDetailsPage  />
                    </PrivateRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}