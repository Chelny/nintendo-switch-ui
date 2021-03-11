import React from "react";
import "./Card.scss";

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`card ${this.props.boxShadowAnimation ? "box-shadow-animation" : ""}`}>
        {/* <img src={this.props.image} alt={this.props.title} title={this.props.title} /> */}
        <p>{this.props.title}</p>
      </div>
    );
  }
}
