import React from "react";
import "./Bullets.scss";

export default class Bullets extends React.Component {
  constructor(props) {
    super(props);
    this.bulletsCount = Array.from({ length: +props.count }, (v, i) => i + 1);
  }

  render() {
    return (
      <div className="bullets">
        {this.bulletsCount.map(i => <span key={i} className={`bullet ${this.props.progress >= i ? "bullet--filled" : ""}`}></span>)}
      </div>
    );
  }
}
