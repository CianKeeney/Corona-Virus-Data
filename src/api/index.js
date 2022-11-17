import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

/*
This is an async await function that calls the Covid Tracking API and retrieves the JSON object with the data and makes sure that the URL and data does srill exist at the specified URL.
It creates a new array from the "confirmed, recovered, deaths" cases that the JSON supplies.
*/

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const { data: { confirmed, recovered, deaths } } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths };
  } catch (error) {
    return error;
  }
};

/*
This is an async await function that calls the Covid Tracking API and retrieves the JSON object with the data about the daily Covid cases.
The data.map creates a new array from calling a function and makes a dictionary with the keys and values.
*/

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get('https://api.covidtracking.com/v1/us/daily.json');

    return data.map(({ positive, recovered, death }) => ({ confirmed: positive, recovered, deaths: death }));
  } catch (error) {
    return error;
  }
};

/*
This is an async await function that calls the Covid Tracking API and retrieves the JSON object with the data about the countries Covid cases.
The data.map creates a new array from calling a function and makes a variable with the name of the country.
*/

export const fetchCountries = async () => {
  try {
    const { data: { countries } } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};
