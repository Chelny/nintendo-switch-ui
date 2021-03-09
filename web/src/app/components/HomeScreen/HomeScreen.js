import React from "react";
import "./HomeScreen.scss";
import TimeWiFiBatteryBar from "../../shared/components/TimeWiFiBatteryBar/TimeWiFiBatteryBar";
import UsersSection from './UsersSection';
import GamesSection from './GamesSection';
import NavigationSection from './NavigationSection';
import FooterSection from './FooterSection';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.homeScreenRef = React.createRef();
    this.usersSectionRef = React.createRef();
    this.gamesSectionRef = React.createRef();
    this.navSectionRef = React.createRef();
    this.footerSectionRef = React.createRef();
  }

  componentDidMount() {
    // this.handleBlur();
  }

  handleBlur = () => {
    // this.homeScreenRef.current.focus();
    // this.gamesSectionRef.current.gamesRef[0] && this.gamesSectionRef.current.gamesRef[0].focus();
  };

  handleKeyPress = (event) => {
    console.log("handleKeyPress", event.which);
    switch (event.which) {
      case 65: // A
      case 97:
        this.setState({});
        break;
      case 89: // Y
      case 121:
        console.log("TODO - Y key pressed!");
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
      <div className="home-screen" tabIndex="0" ref={this.homeScreenRef}
        onBlur={this.handleBlur} onKeyPress={this.handleKeyPress}>
        <section className="users-section">
          <TimeWiFiBatteryBar />
          <UsersSection ref={this.usersSectionRef} />
        </section>
        <section className="games-section">
          <GamesSection ref={this.gamesSectionRef} />
        </section>
        <section className="navigation-section">
          <NavigationSection ref={this.navSectionRef} />
        </section>
        <section className="footer-section">
          <FooterSection ref={this.footerSectionRef} />
        </section>
      </div>
    );
  }
}
