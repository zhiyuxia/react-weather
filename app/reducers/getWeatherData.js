

export const getWeatherData = (state = [], action) => {
  switch (action.type) {
    case "GET_WEATHER":
      let hasCity = state.some(data => data.city.name === action.payload.data.city.name);
      return hasCity ? state : [...state, action.payload.data];
    default:
      return state;  
  }
};