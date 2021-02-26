import React from "react";
import "./App.scss";
import LockScreen from "./components/LockScreen/LockScreen";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import { Screen } from "./shared/enums/Screen";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: Screen.Lock
    }
  }

  setScreen = (screen) => {
    this.setState({ visible: screen });
  };

  render() {
    return (
      <div className="app">
        <h1>Nintendo Switch Home Screen UI (Dark Theme)</h1>
        <div className="nintendo-switch">
          {this.state.visible === Screen.Home ?
            <HomeScreen />
            :
            // TODO: Complete FeaturedNewsScreen
            // this.state.visible === Screen.FeaturedNews ?
            // <FeaturedNewsScreen />
            // :
            <LockScreen screenChange={this.setScreen} />}
        </div>
        <p><b>Instructions:</b><br/>Use the followings keys: arrow keys, A, B, X and Y.</p>
        <p>Made with React by <a href="https://linkedin.com/in/chelny" target="_blank" rel="noreferrer">Chelny</a>.</p>
      </div>
    );
  }
}
