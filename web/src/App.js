import React from "react";
import "./App.scss";
import LockScreen from "./app/components/LockScreen/LockScreen";
import HomeScreen from "./app/components/HomeScreen/HomeScreen";
import { Screen } from "./app/shared/enums/Screen";

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
          {/* <HomeScreen /> */}
          {/* TODO: Complete FeaturedNewsScreen */}
          {this.state.visible === Screen.Home ?
            <HomeScreen />
            :
            // this.state.visible === Screen.FeaturedNews ?
            //   <FeaturedNewsScreen />
            //   :
              <LockScreen screenChange={this.setScreen} />}
        </div>
        <p><b>Instructions:</b><br />Use the followings keys: arrow keys, A, B, X and Y.</p>
        <small>This webpage is optimized for desktop only.</small>
        <p>Made with React by <a href="https://linkedin.com/in/chelny" target="_blank" rel="noreferrer">Chelny</a>.</p>
      </div>
    );
  }
}
