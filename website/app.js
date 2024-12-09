/* Global Variables */
const apiKey = '482ef42c252a62cef19694d1bd96368a&units=imperial';

/* Utility function for error handling */
const handleError = (message) => {
    console.error(message);
    alert(message);  // Show a friendly message to the user
}

/* Create a new date instance dynamically with JS */
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

/* Async function to get weather data */
const getWeatherData = async (userZip) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${userZip}&appid=${apiKey}&units=imperial`);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        
        if (!data.main) {
            throw new Error(`Invalid data received: ${JSON.stringify(data)}`);
        }

        return { temp: data.main.temp };  // Return the temperature data

    } catch (error) {
        handleError('Error fetching weather data: ' + error.message);
    }
};

/* Async function to post data */
const postData = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        return await response.json();
    } catch (error) {
        handleError('Error posting data: ' + error.message);
    }
};

/* Async function to update the UI */
const updateUI = async () => {
    try {
        const request = await fetch('http://localhost:3000/all');
        const data = await request.json();
        document.getElementById('date').innerHTML = `Date: ${data.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${Math.round(data.temp)}°`;
        document.getElementById('content').innerHTML = `Feeling: ${data.feel}`;
    } catch (error) {
        handleError('Error updating UI: ' + error.message);
    }
};

/* Event listener for the Generate button */
document.getElementById('generate').addEventListener('click', () => {
    const zip = document.getElementById('zip').value;
    const feel = document.getElementById('feelings').value;
    const date = new Date().toLocaleDateString();

    // Perform async operations
    getWeatherData(zip)
        .then((weatherData) => {
            if (weatherData) {
                return postData('http://localhost:3000/add', { ...weatherData, feel, date });
            }
            throw new Error('Failed to get weather data');
        })
        .then(() => updateUI())
        .catch(handleError)
});
