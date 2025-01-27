import React from 'react';
import './LockScreen.scss';
import FeaturedNews from '@components/LockScreen/FeaturedNews/FeaturedNews';
import HomeMenu from '@components/LockScreen/HomeMenu/HomeMenu';
import { LockScreenSection } from '@shared/enums/LockScreenSection';

export default class LockScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      boxShadowAnimation: false,
      expanded: LockScreenSection.None,
      scaleAnimation: false,
      unlocked: false,
      unlockProgress: 0
    };
    this.lockScreenRef = React.createRef();
    this.prevKeyCode = null;
    this.unlockBulletsCount = 3;
    this.unlockProgressTimeoutId = null;
  }

  componentDidMount() {
    this.handleBlur();
  }

  handleBlur = () => {
    this.lockScreenRef.current.focus();
  }

  handleKeyDown = (event) => {
    const keyCode = event.which || event.keyCode || 0;

    switch (keyCode) {
      case 38: // TOP button
      case 40: // BOTTOM button
      case 37: // LEFT button
      case 39: // RIGHT button
        if ([LockScreenSection.FeaturedNews, LockScreenSection.Home].includes(this.state.expanded)) {
          this.pressSameButtonThreeTime(keyCode);
          break;
        }
      case 65: // A button
      case 97:
      case 88: // X button
      case 120:
        if ([LockScreenSection.FeaturedNews, LockScreenSection.Home].includes(this.state.expanded)) {
          this.pressSameButtonThreeTime(keyCode);
        } else {
          if (this.state.expanded === LockScreenSection.None) {
            this.setState({
              expanded: LockScreenSection.Home
            });
          }
        }
        break;
      case 66: // B button
      case 98:
        if (([LockScreenSection.FeaturedNews, LockScreenSection.Home].includes(this.state.expanded))
          && this.state.unlockProgress < this.unlockBulletsCount) {
          this.setState({
            expanded: LockScreenSection.None,
            unlockProgress: 0
          });
        }
        break;
        break;
      case 89: // Y button
      case 121:
        if (this.state.expanded === LockScreenSection.None) {
          this.setState({
            expanded: LockScreenSection.FeaturedNews
          });
        } else {
          this.pressSameButtonThreeTime(keyCode);
        }
        break;
      default:
        break;
    }
  }

  pressSameButtonThreeTime = (keyCode) => {
    clearTimeout(this.unlockProgressTimeoutId);

    if (this.prevKeyCode && this.prevKeyCode !== keyCode) {
      // Reset progress if differents buttons are pressed
      this.setState({ unlockProgress: 0 });
      this.prevKeyCode = null;
    } else {
      // Increment progress bar value
      this.setState(prevState => ({ unlockProgress: ++prevState.unlockProgress }));
      this.prevKeyCode = keyCode;
      
      this.unlockProgressTimeoutId = setTimeout(() => {
        this.setState({ unlockProgress: 0 });
        this.prevKeyCode = null;
      }, 2000);

      if (this.state.unlockProgress + 1 === this.unlockBulletsCount) {
        clearTimeout(this.unlockProgressTimeoutId);

        this.setState({ boxShadowAnimation: true });

        setTimeout(() => {
          this.setState({ scaleAnimation: true });
        }, 500);

        setTimeout(() => {
          this.props.onScreenChange(this.state.expanded);
        }, 700);
      }
    }
  }

  render() {
    return (
      <div className="lock-screen" tabIndex="0" ref={this.lockScreenRef}
        onBlur={this.handleBlur} onKeyDown={this.handleKeyDown}>
        <FeaturedNews {...this.state} unlockBulletsCount={this.unlockBulletsCount} />
        <HomeMenu {...this.state} unlockBulletsCount={this.unlockBulletsCount} />
      </div>
    );
  }
}
