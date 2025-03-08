import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const apiKey = 'ccd0af738ca3c1cbd35a366c56130660';

export const fetchCities = createAsyncThunk('weather/fetchCities', async () => {
    const response = await axios.get('/cities.json');
    return response.data;
});

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    return response.data;
});

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        cities: [],
        weather: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCities.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCities.fulfilled, (state, action) => {
                state.loading = false;
                state.cities = action.payload || [];
            })
            .addCase(fetchCities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchWeather.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.weather = action.payload;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default weatherSlice.reducer;
