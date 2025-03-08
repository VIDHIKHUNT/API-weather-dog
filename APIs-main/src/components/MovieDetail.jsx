import { useSelector } from 'react-redux';

const MovieDetails = () => {
    const { movie, loading, error } = useSelector((state) => state.movie);

    if (loading) return <p>Loading movie details...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!movie) return null;

    return (
        <div>
            <h2>{movie.Title} ({movie.Year})</h2>
            <p><strong>Rated:</strong> {movie.Rated}</p>
            <p><strong>Runtime:</strong> {movie.Runtime}</p>
            <p><strong>IMDB Rating:</strong> {movie.imdbRating} ({movie.imdbVotes} votes)</p>
            <p><strong>Rotten Tomatoes:</strong> {movie.Ratings?.find(r => r.Source === "Rotten Tomatoes")?.Value || "N/A"}</p>
            <p><strong>Type:</strong> {movie.Type}</p>
            <p><strong>Box Office:</strong> {movie.BoxOffice || "N/A"}</p>
            <img src={movie.Poster} alt={movie.Title} style={{ maxWidth: '300px' }} />
        </div>
    );
};

export default MovieDetails;
