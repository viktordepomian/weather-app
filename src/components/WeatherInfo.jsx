import { useState } from 'react';
import cloudy from '/src/assets/images/cloudy.svg';
import lightning from '/src/assets/images/lightning.svg';
import rain from '/src/assets/images/rain.svg';
import snow from '/src/assets/images/snow.svg';
import sunny from '/src/assets/images/sunny.svg';
import axios from 'axios';

export default function WeatherInfo() {
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState({});
    const [suggestions, setSuggestions] = useState([]);
    const apikey = '1bce1d2e31d342aede4f167488ae07e5';

    const handleInputValue = (e) => {
        e.preventDefault();
        setInputValue(e.target.value);

        if (e.target.value.length >= 2) {
            fetchSuggestions(e.target.value);
        } else {
            setSuggestions([]);
        }
    };

    const fetchSuggestions = async (query) => {
        const response = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apikey}`
        );
        const data = response.data;
        const uniqueSuggestions = Array.from(
            new Set(data.map((city) => `${city.name}, ${city.country}`))
        );
        setSuggestions(uniqueSuggestions);
    };

    const handleSuggestionClick = async (suggestion) => {
        setInputValue(suggestion);
        setSuggestions([]);

        const cityName = suggestion.split(',')[0].trim();
        const response = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric`
        );
        const apiData = await response.json();
        setData(apiData);
    };

    const handleClick = async () => {
        const response = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apikey}&units=metric`
        );
        const apiData = await response.json();
        setData(apiData);
        setInputValue('');
    };

    let imgSrc = '';
    switch (data.weather?.[0].main) {
        case 'Clouds':
            imgSrc = cloudy;
            break;
        case 'Thunderstorm':
            imgSrc = lightning;
            break;
        case 'Rain':
            imgSrc = rain;
            break;
        case 'Snow':
            imgSrc = snow;
            break;
        case 'Clear':
            imgSrc = sunny;
            break;
    }

    return (
        <>
            <div className="text-center">
                <h1 className="font-bold text-[#8eaf51] tracking-wide">
                    Weather
                </h1>
                <div className="input flex justify-center mt-7">
                    <input
                        className="border w-1/2 text-sm py-1 px-3"
                        onChange={handleInputValue}
                        value={inputValue}
                        type="text"
                        placeholder="Enter a city name..."
                    />
                </div>
                {suggestions.length > 0 && (
                    <ul className="suggestions">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className="suggestion-item"
                                onClick={() =>
                                    handleSuggestionClick(suggestion)
                                }
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
                <button
                    className="bg-blue-400 text-white flex mt-3 text-sm mx-auto py-2 px-6 rounded-md"
                    onClick={handleClick}
                >
                    Submit
                </button>
                <div>
                    <img
                        className="text-blue-50 w-44 m-auto mt-1"
                        src={imgSrc}
                        alt=""
                    />
                    {data.weather && (
                        <p className="weather-type text-gray-500">
                            {data.weather[0].main}
                        </p>
                    )}
                    {data.main && (
                        <p className="temperature text-[#8eaf51] my-2 text-[52px] font-bold">
                            {Math.floor(data.main?.temp)}&deg;
                        </p>
                    )}
                    <p className="city-name text-gray-500">{data.name}</p>
                </div>
            </div>
        </>
    );
}
