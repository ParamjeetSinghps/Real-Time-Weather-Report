const http = require('http');

// Define the city for which you want to fetch weather data
const city = 'Hyderabad'; // You can change this to any city

// Define the options for the HTTP GET request, including the city query parameter
const options = {
    hostname: 'localhost',
    port: 3000,
    path: `/api/weather?city=${encodeURIComponent(city)}`,
    method: 'GET'
};

// Make the request to the API server
const req = http.request(options, (res) => {
    let data = '';

    // A chunk of data has been received.
    res.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    res.on('end', () => {
        console.log('Weather data received from API:');
        console.log(JSON.parse(data));
    });
});

req.on('error', (error) => {
    console.error(`Problem with request: ${error.message}`);
});

// End the request
req.end();