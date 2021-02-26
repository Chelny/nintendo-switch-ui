import React from "react";
import "./LockScreen.scss";
import { LockScreenSection } from "../../shared/enums/LockScreenSection";
import FeaturedNewsSection from './FeaturedNewsSection';
import HomeMenuSection from './HomeMenuSection';

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
    this.unlockBulletsCount = 3;
  }

  componentDidMount() {
    this.handleBlur();
  }

  handleBlur = () => {
    this.lockScreenRef.current.focus();
  };

  handleKeyDown = (event) => {
    switch (event.which) {
      case 65: // A
      case 97:
        if (this.state.expanded === LockScreenSection.FeaturedNews ||
          this.state.expanded === LockScreenSection.Home) {
          this.setState({ unlockProgress: this.state.unlockProgress + 1 });

          if (this.state.unlockProgress + 1 === this.unlockBulletsCount) {
            this.setState({ boxShadowAnimation: true });
            setTimeout(() => {
              this.setState({ scaleAnimation: true });
            }, 500);
            setTimeout(() => {
              this.props.screenChange(this.state.expanded);
            }, 700);
          }
        } else {
          if (this.state.expanded === LockScreenSection.None) {
            this.setState({ expanded: LockScreenSection.Home });
          }
        }
        break;
      case 66: // B
      case 98:
        if ((this.state.expanded === LockScreenSection.FeaturedNews ||
          this.state.expanded === LockScreenSection.Home) &&
          this.state.unlockProgress < this.unlockBulletsCount) {
          this.setState({
            expanded: LockScreenSection.None,
            unlockProgress: 0
          });
        }
        break;
      case 88: // X
      case 120:
        break;
      case 89: // Y
      case 121:
        if (this.state.expanded === LockScreenSection.None) {
          this.setState({ expanded: LockScreenSection.FeaturedNews });
        }
        break;
      case 38: // TOP
      case 40: // BOTTOM
      case 37: // LEFT
      case 39: // RIGHT
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  render() {

    return (
      <div className="lock-screen" tabIndex="0" ref={this.lockScreenRef}
        onBlur={this.handleBlur} onKeyDown={this.handleKeyDown}>
        <FeaturedNewsSection {...this.state} unlockBulletsCount={this.unlockBulletsCount} />
        <HomeMenuSection {...this.state} unlockBulletsCount={this.unlockBulletsCount} />
      </div>
    );
  }
}
