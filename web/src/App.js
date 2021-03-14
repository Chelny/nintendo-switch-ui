import React from 'react';
import './App.scss';
import FeaturedNewsScreen from '@components/FeaturedNewsScreen/FeaturedNewsScreen';
import HomeScreen from '@components/HomeScreen/HomeScreen';
import LockScreen from '@components/LockScreen/LockScreen';
import { Screen } from '@shared/enums/Screen';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activeScreen: Screen.Lock
    }
  }

  handleKeyDown = (event) => {
    const keyCode = event.which || event.keyCode || 0;

    switch (keyCode) {
      case 27: // ESC key = power button/back to lockscreen
        this.setActiveScreen(Screen.Lock);
        break;
      default:
        break;
    }
  }

  setActiveScreen = (screen) => {
    this.setState({ activeScreen: screen });
  }

  render() {
    return (
      <div className="app">
        <h1>Nintendo Switch Home Screen UI (Dark Theme)</h1>
        <div className="nintendo-switch" onKeyDown={this.handleKeyDown}>
          {/* <HomeScreen /> */}
          {/* TODO: Complete FeaturedNewsScreen */}
          {this.state.activeScreen === Screen.Home ?
            <HomeScreen />
            : this.state.activeScreen === Screen.FeaturedNews ?
              <FeaturedNewsScreen onKeyDown={this.setActiveScreen} />
              : <LockScreen onScreenChange={this.setActiveScreen} />}
        </div>
        <p><b>Instructions:</b><br />Use the followings keys: arrow keys, A, B, X and Y.</p>
        <small>This webpage is optimized for desktop only.</small>
        <p>Made with React by <a href="https://linkedin.com/in/chelny" target="_blank" rel="noreferrer">Chelny</a>.</p>
      </div>
    );
  }
}
