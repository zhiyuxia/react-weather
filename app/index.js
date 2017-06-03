import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, combineReducers} from "redux";
import {Provider} from "react-redux";
import ReduxPromise from "redux-promise";
import SearchBar from "./components/SearchBar";
import WeatherList from "./components/WeatherList";
import {getWeatherData} from "./reducers/getWeatherData";
import {getWeather} from "./action/action";
import "./stylesheet/style.css";

const rootReducer = combineReducers({
  getWeatherData,
}); 
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore); 
const store = createStoreWithMiddleware(rootReducer);

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <SearchBar />
        <WeatherList />
      </div>
    );
  }
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
   document.getElementById("app"));