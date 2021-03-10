import React from 'react';
import './HomeScreen.scss';
import TimeWiFiBatteryBar from '../../shared/components/TimeWiFiBatteryBar/TimeWiFiBatteryBar';
import UsersSection from './UsersSection';
import GamesSection from './GamesSection';
import NavigationSection from './NavigationSection';
import FooterSection from './FooterSection';

const DIRECTION = {
  TOP: 'TOP',
  LEFT: 'LEFT',
  BOTTOM: 'BOTTOM',
  RIGHT: 'RIGHT'
};

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.homeScreenRef = React.createRef();
    this.usersSectionRef = React.createRef();
    this.gamesSectionRef = React.createRef();
    this.navSectionRef = React.createRef();
    this.footerSectionRef = React.createRef();
    this.maxVisibleGames = 12;
  }

  handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      const target = event.target;

      if (target.hasAttribute('tabIndex')) {
        target.focus();
      }
    }
  };

  handleKeyDown = (event) => {
    const key = event.which || event.keyCode || 0;

    this.setFocusedElement();

    switch (key) {
      case 65: // A
      case 97:
        console.log('TODO - A key pressed!', event.which);
        this.setState({});
        break;
      case 38: // TOP
        this.direction = DIRECTION.TOP;
        break;
      case 40: // BOTTOM
        this.direction = DIRECTION.BOTTOM;
        break;
      case 37: // LEFT
        this.direction = DIRECTION.LEFT;
        break;
      case 39: // RIGHT
        this.direction = DIRECTION.RIGHT;
        break;
      default:
        break;
    }

    if (this.direction) {
      this.setFocusOnElement();
    }
  };

  setFirstGameFocused = (gamesLoaded) => {
    if (gamesLoaded) {
      this.gamesSectionRef.current.gamesRef[0] && this.gamesSectionRef.current.gamesRef[0].focus();
      this.setFocusedElement();
    }
  };

  setFocusedElement = () => {
    this.focusedElement = document.activeElement;

    if (!this.focusedElement || this.focusedElement == document.body) {
      this.focusedElement = null;
    } else if (document.querySelector) {
      this.focusedElement = document.querySelector(':focus');
    }
  };

  setFocusOnElement = () => {
    let tabIndex = 0;

    switch (this.direction) {
      case DIRECTION.TOP:
        // tabIndex = this.focusedElement.tabIndex + 1;
        break;
      case DIRECTION.RIGHT:
        tabIndex = this.focusedElement.tabIndex + 1;
        break;
      case DIRECTION.BOTTOM:
        // tabIndex = this.focusedElement.tabIndex + 1;
        break;
      case DIRECTION.LEFT:
        tabIndex = this.focusedElement.tabIndex - 1;
        break;
      default:
        break;
    }

    let element = document.querySelector(`[tabindex="${tabIndex}"]`);
    let loopScrollPos = null;

    if (!element) {
      if (['game', 'all-software'].some(className => this.focusedElement.classList.contains(className))) {
        const games = Array.from(document.querySelectorAll('.game'));
        // Looping allowed with games
        if (this.direction === DIRECTION.RIGHT) {
          element = games.shift();
          loopScrollPos = 0;
        } else if (this.direction === DIRECTION.LEFT) {
          const allSoftwareEl = document.querySelector('.all-software');
          element = allSoftwareEl ? allSoftwareEl : games.slice(-1).pop();
          loopScrollPos = element.closest('section').scrollWidth;
        }
      } else {
        return;
      }
    }

    const parentEl = element.closest('section');
    const parentScrollPos = loopScrollPos !== null ? loopScrollPos : parentEl.scrollLeft;
    const elDOMRect = element.getBoundingClientRect();
    const elementLeftPos = Math.round(elDOMRect.x);
    const elementRightPos = Math.round(elementLeftPos + elDOMRect.width);

    element.focus();

    if (elementLeftPos <= 0 || elementRightPos <= 0) {
      parentEl.scroll({ left: parentScrollPos - 183 });
    }

    if (elementLeftPos >= 850 || elementRightPos >= 850) {
      parentEl.scroll({ left: parentScrollPos + 183 });
    }
  };

  render() {
    return (
      <div className="home-screen" ref={this.homeScreenRef}
        onBlur={this.handleBlur} onKeyDown={this.handleKeyDown}>
        <section className="users-section">
          <TimeWiFiBatteryBar />
          <UsersSection tabIndexGroup={10} ref={this.usersSectionRef} />
        </section>
        <section className="games-section">
          <GamesSection tabIndexGroup={40} ref={this.gamesSectionRef}
            maxVisibleGames={this.maxVisibleGames}
            gamesLoaded={this.setFirstGameFocused} />
        </section>
        <section className="navigation-section">
          <NavigationSection tabIndexGroup={80} ref={this.navSectionRef} />
        </section>
        <section className="footer-section">
          <FooterSection ref={this.footerSectionRef} />
        </section>
      </div>
    );
  }
}
