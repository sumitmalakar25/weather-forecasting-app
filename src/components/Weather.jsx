import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import Cityerror from './Cityerror';

function Weather() { 
  const [query, setQuery] = useState();
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const toDate = () => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'Nocvember',
      'December',
    ];
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  const search = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setQuery('');
      setWeather({ ...weather, loading: true });
      const url = 'https://api.openweathermap.org/data/2.5/weather';
      const appid = 'f00c38e0279b7bc85480c3fe775d518c';
      //console.log('Enter');
      await axios
        .get(url, {
          params: {
            q: query,
            units: 'metric',
            appid: appid,
          },
        })
        .then((res) => {
          console.log('res', res);
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setQuery('');
          console.log('error', error);
        });
    }
  };

  return (
    <div >
      <h1 className="appName">
        Weather <span>🌤</span>
      </h1>
      <div className="search-bar">
        <input
          type="text"
          className="Scity"
          placeholder="Search City.."
          name="query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyPress={search}
        />
      </div>

      {weather.loading && (
        <>
          <Loader />
        </>
      )}
      {weather.error && (
        <>
         <Cityerror />
        </>
      )}

      {weather && weather.data && weather.data.main && (
        <div className='result'>
          <div className="cityName">            
              {weather.data.name}, <span>{weather.data.sys.country}</span>            
          </div>
          <div className="date">
            <span>{toDate()}</span>
          </div>
          <div className="Dres">            
            {Math.round(weather.data.main.temp)}
            <sup className="deg">&deg;C</sup>
          </div>
          <div className="des-wind">
            <p>{weather.data.weather[0].description.toUpperCase()}</p>
            <p style={{fontWeight:"bold"}}>Wind Speed: {weather.data.wind.speed}m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;