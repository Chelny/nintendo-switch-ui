import React from 'react';
import './HomeScreen.scss';
import BottomSection from '@components/HomeScreen/BottomSection/BottomSection';
import Games from '@components/HomeScreen/Games/Games';
import Navigation from '@components/HomeScreen/Navigation/Navigation';
import TopSection from '@components/HomeScreen/TopSection/TopSection';
import GameService from '@services/GameService';
import NavigationService from '@services/NavigationService';
import UserService from '@services/UserService';
import { ActiveHomeRow } from '@shared/enums/ActiveHomeRow';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      games: [],
      navItems: [],
      activeRow: ActiveHomeRow.Games,
      activeItem: 0,
      prevActiveRow: ActiveHomeRow.Games,
      prevActiveItem: 0,
      shakeAnimation: false,
      gamesInViewport: []
    };
    this.maxVisibleGames = 12;
  }

  componentDidMount() {
    UserService.getUsers().then(
      response => this.setState({ users: response }),
      error => console.error(error)
    );

    GameService.getGames().then(
      response => {
        this.setState({ games: response });

        // Set visible games in viewport
        const maxElements = this.state.games.length < 4 ? this.state.games.length : 4;
        const gamesInViewport = [];

        for (var tabIndex = 0; tabIndex < maxElements; tabIndex++) {
          gamesInViewport.push(tabIndex);
        }

        this.setState({ gamesInViewport: gamesInViewport });
      },
      error => console.error(error)
    );

    NavigationService.getNavigation().then(
      response => this.setState({ navItems: response }),
      error => console.error(error)
    );
  }

  handleBlur = () => {
    const rowClass = this.state.activeRow === ActiveHomeRow.Users ?
      '.user' : this.state.activeRow === ActiveHomeRow.Navigation ?
        '.nav-item' : '.game, .all-software';
    const rowSiblings = document.querySelectorAll(rowClass);
    const target = Array.from(rowSiblings)[this.state.activeItem];

    // Focus back previously selected item, when clicking outside of console screen
    target.focus();
  }

  handleKeyDown = (event) => {
    const keyCode = event.which || event.keyCode || 0;

    switch (keyCode) {
      case 37: // LEFT button
        this.handleKeyDownLeft();
        break;
      case 38: // TOP button
        this.handleKeyDownUp();
        break;
      case 39: // RIGHT button
        this.handleKeyDownRight();
        break;
      case 40: // BOTTOM button
        this.handleKeyDownDown();
        break;
      case 65: // A button
      case 97:
        this.handleKeyDownA();
        break;
      default:
        break;
    }
  }

  handleKeyDownLeft = () => {
    if (this.state.activeItem === 0) {
      if (this.state.activeRow === ActiveHomeRow.Games) {
        const activeItem = this.state.games.length > this.maxVisibleGames ?
          this.maxVisibleGames : this.state.games.length - 1;

        this.setState(prevState => ({
          activeItem: activeItem,
          prevActiveRow: prevState.activeRow
        }));
      } else {
        this.toggleShakeAnimation();
      }
    } else {
      this.setState(prevState => ({
        activeItem: --prevState.activeItem,
        prevActiveRow: prevState.activeRow
      }));
    }
  }

  handleKeyDownUp = () => {
    if (this.state.activeRow > ActiveHomeRow.Users) {
      let activeItem = 0;

      if (this.state.activeRow === ActiveHomeRow.Games) {
        if (this.state.prevActiveRow === ActiveHomeRow.Users) {
          // Select previously selected user
          activeItem = this.state.prevActiveItem;
        } else {
          // Default behaviour
          if (this.state.gamesInViewport.includes(this.state.activeItem)) {
            if (this.state.gamesInViewport.indexOf(this.state.activeItem) > 0) {
              activeItem = 0;
            }

            if (this.state.gamesInViewport.indexOf(this.state.activeItem) > 0) {
              activeItem = this.state.users.length - 1;
            }
          }
        }
      }

      if (this.state.activeRow === ActiveHomeRow.Navigation) {
        if (this.state.prevActiveRow === ActiveHomeRow.Games) {
          // Select previously selected game
          activeItem = this.state.prevActiveItem;
        } else {
          // Default behaviour
          const lastGameInViewport = this.state.gamesInViewport.length - 1;

          if (this.state.activeItem === 0) {
            activeItem = this.state.gamesInViewport[0];
          } else if (this.state.activeItem >= 1 && this.state.activeItem <= 3) {
            activeItem = this.state.gamesInViewport[1] || lastGameInViewport;
          } else if (this.state.activeItem >= 4 && this.state.activeItem <= 5) {
            activeItem = this.state.gamesInViewport[2] || lastGameInViewport;
          } else {
            activeItem = lastGameInViewport;
          }
        }
      }

      this.setState(prevState => ({
        activeRow: --prevState.activeRow,
        activeItem: activeItem,
        prevActiveItem: prevState.activeItem
      }));
    }
  }

  handleKeyDownRight = () => {
    switch (this.state.activeRow) {
      case ActiveHomeRow.Users:
        if (this.state.activeItem < this.state.users.length - 1) {
          this.setState(prevState => ({
            activeItem: ++prevState.activeItem,
            prevActiveRow: prevState.activeRow
          }));
        } else {
          this.toggleShakeAnimation();
        }
        break;
      case ActiveHomeRow.Games:
        const lastGameRef = this.state.games.length > this.maxVisibleGames ?
          this.maxVisibleGames : this.state.games.length - 1;
  
        this.state.activeItem === lastGameRef ?
          this.setState({ activeItem: 0 }) :
          this.setState(prevState => ({
            activeItem: ++prevState.activeItem,
            prevActiveRow: prevState.activeRow
          }));
        break;
      case ActiveHomeRow.Navigation:
        if (this.state.activeItem < this.state.navItems.length - 1) {
          this.setState(prevState => ({
            activeItem: ++prevState.activeItem,
            prevActiveRow: prevState.activeRow
          }));
        } else {
          this.toggleShakeAnimation();
        }
        break;
      default:
        break;
    }
  }

  handleKeyDownDown = () => {
    if (this.state.activeRow < ActiveHomeRow.Navigation) {
      let activeItem = 0;

      if (this.state.activeRow === ActiveHomeRow.Users) {
        if (this.state.prevActiveRow === ActiveHomeRow.Games) {
          // Select previously selected game
          activeItem = this.state.prevActiveItem;
        } else {
          // Default behaviour
          if (this.state.activeItem < 4) {
            activeItem = this.state.gamesInViewport[0];
          } else {
            activeItem = this.state.gamesInViewport[1] || this.state.gamesInViewport[this.state.gamesInViewport.length - 1];
          }
        }
      }

      if (this.state.activeRow === ActiveHomeRow.Games) {
        if (this.state.prevActiveRow === ActiveHomeRow.Navigation) {
          // Select previously selected navigation item
          activeItem = this.state.prevActiveItem;
        } else {
          // Default behaviour
          if (this.state.activeItem === this.state.gamesInViewport[0]) {
            activeItem = 0;
          } else if (this.state.activeItem === this.state.gamesInViewport[1]) {
            activeItem = 2;
          } else if (this.state.activeItem === this.state.gamesInViewport[2]) {
            activeItem = 4;
          } else {
            activeItem = 6;
          }
        }
      }

      this.setState(prevState => ({
        activeRow: ++prevState.activeRow,
        activeItem: activeItem,
        prevActiveItem: prevState.activeItem
      }));
    }
  }

  handleKeyDownA = () => {
    // TODO: complete
  }

  toggleShakeAnimation = () => {
    this.setState({ shakeAnimation: true });
    setTimeout(() => {
      this.setState({ shakeAnimation: false });
    }, 200);
  }

  render() {
    return (
      <div className="home-screen" onBlur={this.handleBlur} onKeyDown={this.handleKeyDown}>
        <TopSection
          users={this.state.users}
          activeRow={this.state.activeRow === ActiveHomeRow.Users}
          activeItem={this.state.activeItem}
          shakeAnimation={this.state.shakeAnimation} />
        <Games
          games={this.state.games}
          activeRow={this.state.activeRow === ActiveHomeRow.Games}
          activeItem={this.state.activeItem}
          maxVisibleGames={this.maxVisibleGames}
          onGamesScroll={gameTabIndexes => this.setState({ gamesInViewport: gameTabIndexes })} />
        <Navigation
          navItems={this.state.navItems}
          activeRow={this.state.activeRow === ActiveHomeRow.Navigation}
          activeItem={this.state.activeItem}
          shakeAnimation={this.state.shakeAnimation} />
        <BottomSection activeRow={this.state.activeRow} />
      </div>
    );
  }
}
