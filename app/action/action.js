import axios from "axios";

const apiKey = "c08b8cf5b5d78e5926a693e33fd29fc9";
const baseURL = `http://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=metric`;
export const getWeather = (city) => {
  let url = `${baseURL}&q=${city},cn`;
  let result = axios.get(url);
  return {
    type: "GET_WEATHER",
    payload: result,
  };
};