import React from "react";
import "./TimeWiFiBatteryBar.scss";

export default class TimeWiFiBatteryBar extends React.Component {
  constructor() {
    super();
    this.state = {
      time: null
    };
    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const hh = new Date().getHours();
      const mm = new Date().getMinutes();
      const meridian = hh >= 12 ? "PM" : "AM";
      this.setState({
        time: `${hh < 10 ? "0" + hh : hh}:${mm < 10 ? "0" + mm : mm} ${meridian}`
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="time-wifi-battery-bar-wrapper">
        <span className="time">{this.state.time}</span>
        <span className="wifi-icon">W</span>
        <span className="battery-icon">100% B</span>
      </div>
    );
  }
}
