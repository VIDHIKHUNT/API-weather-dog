import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities, fetchWeather } from '../features/weatherSlice';
import { useNavigate } from 'react-router-dom';

const Weather = () => {
    const dispatch = useDispatch();
    const { cities, weather, loading, error } = useSelector((state) => state.weather);
    const [selectedCity, setSelectedCity] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCities());
    }, [dispatch]);

    const handleWeatherFetch = () => {
        if (selectedCity) {
            dispatch(fetchWeather(selectedCity));
        } else {
            alert('Please select a city.');
        }
    };

    return (
        <div>
            <h1>Weather App</h1>

            <select onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity}>
                <option value="">Select a city</option>
                {Array.isArray(cities) && cities.map((city) => (
                    <option key={city.name} value={city.name}>
                        {city.name}, {city.country}
                    </option>
                ))}
            </select>

            <button onClick={handleWeatherFetch} disabled={loading}>
                {loading ? 'Loading...' : 'Get Weather'}
            </button>

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {weather && (
                <div>
                    <h2>Weather in {weather.name}</h2>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Description: {weather.weather[0].description}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                </div>
            )}
            <button onClick={() => navigate('/dog')}>Go To Dog API</button>
            <button onClick={() => navigate('/movie')}>Go To Movie API</button>
        </div>
    );
};

export default Weather;
