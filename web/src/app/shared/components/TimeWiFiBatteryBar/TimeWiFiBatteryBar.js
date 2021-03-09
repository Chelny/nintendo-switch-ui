import React from "react";
import "./TimeWiFiBatteryBar.scss";

export default class TimeWiFiBatteryBar extends React.Component {
  constructor() {
    super();
    this.state = {
      time: null,
      meridian: null
    };
    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const hh = new Date().getHours();
      const mm = new Date().getMinutes();
      const meridian = hh >= 12 ? "PM" : "AM";
      this.setState({
        time: `${hh < 10 ? "0" + hh : hh}:${mm < 10 ? "0" + mm : mm}`,
        meridian: `${meridian}`
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="time-wifi-battery-bar-wrapper">
        <span className="time">
          {this.state.time} <span className="meridian">{this.state.meridian}</span>
        </span>
        <span className="wifi">
          <img className="wifi-icon" src={`assets/images/icons/wifi.png`}/>
        </span>
        <span className="battery">
          98% <img className="battery-icon" src={`assets/images/icons/battery.png`} />
        </span>
      </div>
    );
  }
}
