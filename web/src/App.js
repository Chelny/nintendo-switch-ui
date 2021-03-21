import React from 'react';
import './App.scss';
import FeaturedNewsScreen from '@components/FeaturedNewsScreen/FeaturedNewsScreen';
import HomeScreen from '@components/HomeScreen/HomeScreen';
import LockScreen from '@components/LockScreen/LockScreen';
import JoyconThemeService from '@services/JoyconThemeService'
import { Screen } from '@shared/enums/Screen';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activeScreen: Screen.Lock,
      joyconTheme: null
    }
    this.joyconThemes = [];
  }

  componentDidMount() {
    JoyconThemeService.getJoyconThemes().then(
      response => {
        this.joyconThemes = response;
        
        if (this.joyconThemes && this.joyconThemes[0]) {
          this.setState({ joyconTheme: this.joyconThemes[0].className });
        }
      },
      error => console.error(error)
    );
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

  handleJoyconsThemeChange = (event) => {
    this.setState({ joyconTheme: event.target.value });
  }

  setActiveScreen = (screen) => {
    this.setState({ activeScreen: screen });
  }

  render() {
    return (
      <div className="app">
        <h1>Nintendo Switch Home Screen UI (Dark Theme)</h1>

        <div className="nintendo-switch">
          {/* Left Joy-Con */}
          <div className={`nintendo-switch__joycon left ${this.state.joyconTheme}`}>
            <div className="minus"></div>
            <div className="analog-stick"></div>
            <div className="button-group">
              <div className="arrow top"></div>
              <div className="arrow right"></div>
              <div className="arrow bottom"></div>
              <div className="arrow left"></div>
            </div>
            <div className="capture"></div>
          </div>

          {/* Screen */}
          <div className="nintendo-switch__body">
            <div className="nintendo-switch__screen" onKeyDown={this.handleKeyDown}>
              {this.state.activeScreen === Screen.Home ?
              <HomeScreen />
              : this.state.activeScreen === Screen.FeaturedNews ?
                <FeaturedNewsScreen onKeyDown={this.setActiveScreen} />
                : <LockScreen onScreenChange={this.setActiveScreen} />}
            </div>
          </div>
          
          {/* Right Joy-Con */}
          <div className={`nintendo-switch__joycon right ${this.state.joyconTheme}`}>
            <div className="plus"></div>
            <div className="button-group">
              <div className="letter" data-button="X"></div>
              <div className="letter" data-button="A"></div>
              <div className="letter" data-button="B"></div>
              <div className="letter" data-button="Y"></div>
            </div>
            <div className="analog-stick"></div>
            <div className="home"></div>
          </div>
        </div>

        <div className="select-joycons">
          <b>Choose Joy-Con theme:</b><br />
          <select className="select-joycons__themes" onChange={this.handleJoyconsThemeChange}>
            {this.joyconThemes.map(theme => <option key={theme.id} value={theme.className}>
              {theme.title}
            </option>)}
          </select>
        </div>

        <p><b>Instructions:</b><br />Use the following keyboard keys: arrow keys, A, B, X and Y.</p>
        <small>This webpage is optimized for desktop only.</small>
        <p>Made by <a href="https://github.com/chelny" target="_blank" rel="noreferrer">Chelny</a>.</p>
      </div>
    );
  }
}
