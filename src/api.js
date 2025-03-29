const API_KEY = '517db81f20f9ae81359f6067e8bded9b';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function fetchWeatherData(city) {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error(
      response.status === 404
        ? 'City not found. Please check the spelling and try again.'
        : 'Failed to fetch weather data. Please try again later.'
    );
  }

  return response.json();
}