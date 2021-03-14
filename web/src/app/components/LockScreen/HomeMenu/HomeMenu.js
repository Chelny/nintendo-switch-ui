import React from 'react';
import './HomeMenu.scss';
import { LockScreenSection } from '@shared/enums/LockScreenSection';
import ControllerButton from '@shared/components/ControllerButton/ControllerButton';
import TimeWiFiBatteryBar from '@shared/components/TimeWiFiBatteryBar/TimeWiFiBatteryBar';
import UnlockBar from '@shared/components/UnlockBar/UnlockBar';

export default class HomeMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className={`home-menu ${this.props.expanded === LockScreenSection.Home ? "home-menu--expand" : this.props.expanded === LockScreenSection.FeaturedNews ? "home-menu--collapse" : ""} ${this.props.scaleAnimation ? "scale-animation" : ""}`}>
        <TimeWiFiBatteryBar />
        <img className={`home-menu__icon ${this.props.boxShadowAnimation ? "box-shadow-animation" : ""}`}
          src={`assets/images/icons/home-menu.png`}
          alt="HOME menu" title="HOME menu" />
        {this.props.expanded === LockScreenSection.Home ?
          <UnlockBar bulletsCount={this.props.unlockBulletsCount}
            progress={this.props.unlockProgress} /> :
          <ControllerButton button="A" text="Continue" />}
      </section>
    );
  }
}
