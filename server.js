const express = require('express');
const axios = require('axios'); // Import axios to make HTTP requests
const app = express();
const PORT = 3000;

// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const API_KEY = '3bb74be9c1350d35f0f360622810d3ad';

// Endpoint to fetch weather data for a specific city
app.get('/api/weather', async(req, res) => {
    const city = req.query.city || 'London'; // Default to London if no city is provided

    try {
        // OpenWeatherMap API URL
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        // Fetch weather data from OpenWeatherMap API
        const response = await axios.get(url);
        const data = response.data;

        // Extract relevant information
        const weatherInfo = {
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
            humidity: data.main.humidity,
            wind_speed: data.wind.speed
        };

        // Send the weather data back to the client
        res.json(weatherInfo);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});