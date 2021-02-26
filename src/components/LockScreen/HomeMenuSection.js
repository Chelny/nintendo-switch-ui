import React from "react";
import "./HomeMenuSection.scss";
import { LockScreenSection } from "../../shared/enums/LockScreenSection";
import ConsoleButtonIcon from "../../shared/components/ConsoleButtonIcon/ConsoleButtonIcon";
import TimeWiFiBatteryBar from "../../shared/components/TimeWiFiBatteryBar/TimeWiFiBatteryBar";
import UnlockBar from "../../shared/components/UnlockBar/UnlockBar";

export default class HomeMenuSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className={`to-home-menu ${this.props.expanded === LockScreenSection.Home ? "to-home-menu--expand" : this.props.expanded === LockScreenSection.FeaturedNews ? "to-home-menu--collapse" : ""} ${this.props.scaleAnimation ? "scale-animation" : ""}`}>
        <TimeWiFiBatteryBar />
        <div className="to-home-menu-icon">
        <span className={`to-home-menu-icon-image ${this.props.boxShadowAnimation ? "box-shadow-animation" : ""}`}></span>
          <p className="to-home-menu-icon-text">HOME Menu</p>
        </div>
        {this.props.expanded === LockScreenSection.Home ?
          <UnlockBar bulletsCount={this.props.unlockBulletsCount}
            progress={this.props.unlockProgress} />
          :
          <div className="to-home-menu-continue">
            <ConsoleButtonIcon content="A" />
            <p className="to-home-menu-continue-text">Continue</p>
          </div>}
      </section>
    );
  }
}
