import React from "react";
import "./HomeScreen.scss";

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.homeScreenRef = React.createRef();
  }

  componentDidMount() {
    this.handleBlur();
  }

  handleBlur = () => {
    this.homeScreenRef.current.focus();
  };

  handleKeyPress = (event) => {
    console.log('handleKeyPress', event.which);
    switch (event.which) {
      case 65: // A
      case 97:
        this.setState({});
        break;
      case 89: // Y
      case 121:
        console.log("TODO - Y key pressed!");
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div className="home-screen" tabIndex="0" ref={this.homeScreenRef}
        onBlur={this.handleBlur} onKeyPress={this.handleKeyPress}>
        TODO: User, Games, Navigation, Footer
      </div>
    );
  }
}
