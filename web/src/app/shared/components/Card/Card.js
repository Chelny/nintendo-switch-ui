import React from "react";
import "./Card.scss";

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`card ${this.props.boxShadowAnimation ? "box-shadow-animation" : ""}`}
        style={this.props.style}>
        <p>{this.props.image}</p>
      </div>
    );
  }
}
