import React from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getWeather } from "../action/action";

class SearchBar extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      inputValue: "",
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }
  onInputChange(event) {
    let value = event.target.value;
    this.setState({
      inputValue: value,
    });
  }
  onSubmitClick(e) {
    e.preventDefault();
    this.props.getWeather(this.state.inputValue);
    this.setState({
      inputValue: "",
    });
    this.refs.input.focus();
  }
  render() {
    return (
      <form onSubmit={this.onSubmitClick} className="form">
        <div className="formContainer">
        <h4 className="caption">未来五天全国城市天气变化趋势查询</h4>
          <input ref="input" className="input" value={this.state.inputValue} onChange={this.onInputChange} type="text" placeholder="请输入要查询天气城市名称的拼音，如beijing" />
          <button>搜索</button>
        </div>
      </form >
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({ getWeather }, dispatch);

export default connect(null, mapDispatchToProps)(SearchBar);