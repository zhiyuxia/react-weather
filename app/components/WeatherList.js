import React from "react";
import { connect } from "react-redux";
import { SparkChart } from "./SparkChart";

class WeatherList extends React.Component {
  renderWeather(data) {
    let tempArray = data.list.map(value => value.main.temp);
    let humidityArray = data.list.map(value => value.main.humidity);
    if (data.city.name === undefined) return <div>数据获取中</div>;
    return (
      <tr key={data.city.name}>
        <td>{data.city.name}</td>
        <td><SparkChart data={tempArray} color={"blue"} units="°C"/></td>
        <td><SparkChart data={humidityArray} color={"green"} units="%"/></td>
      </tr>
    );
  }
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>城市</th>
            <th>温度(°C)</th>
            <th>湿度(%)</th>
          </tr>
        </thead>
        <tbody>
          {console.log(this.props.getWeatherData)}
          {this.props.getWeatherData.map(this.renderWeather)}
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = state => ({ getWeatherData: state.getWeatherData });
export default connect(mapStateToProps)(WeatherList);