import React from "react";
import "./UnlockBar.scss";
import Bullets from "../Bullets/Bullets";
import ConsoleButtonIcon from "../ConsoleButtonIcon/ConsoleButtonIcon";
import { ConsoleButtonIconSize } from "../../enums/ConsoleButtonIconSize";

export default class UnlockBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="unlock-bar-wrapper">
        <p className="unlock-bar-wrapper-text">Press the same button three times.</p>
        <div className="bullets-wrapper">
          <Bullets count={this.props.bulletsCount} progress={this.props.progress} />
        </div>
        <div className="to-lock-screen-button-wrapper">
          <ConsoleButtonIcon content="B" size={ConsoleButtonIconSize.Small} />
          <p className="to-lock-screen-button-wrapper-text">Back</p>
        </div>
      </div>
    );
  }
}
