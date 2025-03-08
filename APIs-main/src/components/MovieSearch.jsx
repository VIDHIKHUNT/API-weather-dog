import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMovie } from '../features/movieSlice';
import MovieDetails from './MovieDetail';
import { useNavigate } from 'react-router-dom';

const MovieSearch = () => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearch = () => {
        if (title.trim()) {
            dispatch(fetchMovie(title));
        } else {
            alert("Please enter a movie title.");
        }
    };

    return (
        <div>
            <h1>🎬 Movie Search App</h1>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter movie title..."
            />
            <button onClick={handleSearch}>Search</button>
            <MovieDetails />
            <button onClick={() => navigate('/')}>Go To Weather API</button>
            <button onClick={() => navigate('/dog')}>Go To Dog API</button>
        </div>
    );
};

export default MovieSearch;
