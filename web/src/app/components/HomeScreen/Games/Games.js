import React from 'react';
import './Games.scss';

export default class Games extends React.Component {
  constructor(props) {
    super(props);
    this.gamesRef = [];
    this.maxGameTitleChars = 30;
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.handleFocus();
    }
  }

  handleFocus = () => {
    if (this.props.activeRow && this.gamesRef.length > 0) {
      this.handleScrollOnFocus(this.gamesRef[this.props.activeItem]);
      this.gamesRef[this.props.activeItem].focus();
    }
  }

  handleScrollOnFocus = (gameEl) => {
    const parentEl = gameEl.closest('section');
    const lastGameRef = this.props.games.length > this.props.maxVisibleGames ?
      this.props.maxVisibleGames : this.props.games.length - 1;
    let loopScrollPos = null;
    
    if (this.props.activeItem === 0) {
      loopScrollPos = 0;
    }
    
    if (this.props.activeItem === lastGameRef) {
      loopScrollPos = parentEl.scrollWidth + parentEl.getBoundingClientRect().x;
    }
    
    const parentScrollPos = loopScrollPos !== null ? loopScrollPos : parentEl.scrollLeft;
    const parentElDOMRect = parentEl.getBoundingClientRect();
    const parentElLeftLimit = parentElDOMRect.left;
    const parentElRightLimit = parentElLeftLimit + 640; // 640 = screen width
    const gameElDOMRect = gameEl.getBoundingClientRect();
    const gameElWidth = gameElDOMRect.width - 3; // 3 = unfocused .game-cover's border-width
    const gameElLeftPos = gameElDOMRect.left;
    const gameElRightPos = gameElLeftPos + gameElWidth;

    if (gameElLeftPos >= parentElRightLimit || gameElRightPos >= parentElRightLimit) {
      parentEl.scroll({ left: Math.round(parentScrollPos + gameElWidth) });
    }

    if (gameElLeftPos <= parentElLeftLimit || gameElRightPos <= parentElLeftLimit) {
      parentEl.scroll({ left: parentScrollPos - gameElWidth });
    }
  }

  handleScroll = (event) => {
    const container = event.target;
    const containerDOMRect = container.getBoundingClientRect();
    const containerLeftPos = containerDOMRect.left;
    const containerRightPos = containerLeftPos + containerDOMRect.width;

    const gamesInViewport = Array.from(container.children)
      .filter(gameEl => {
        const gameElDOMRect = gameEl.getBoundingClientRect();
        const gameElLeftPos = gameElDOMRect.left;
        const gameElRightPos = gameElLeftPos + gameElDOMRect.width;

        if (gameElLeftPos >= containerLeftPos && gameElRightPos <= containerRightPos) {
          if (!gameEl.classList.contains('clear')) { // Do not include .clear div
            return gameEl;
          }
        }
      })
      .map(gameEl => +gameEl.getAttribute('tabIndex'));
    
    this.props.onGamesScroll(gamesInViewport);
  }

  render() {
    return (
      <section className="games" onLoad={this.handleFocus} onScroll={this.handleScroll}>
        {this.props.games.map((game, index) =>
          {return (index < this.props.maxVisibleGames) ?
          <div className="game" key={game.id} tabIndex={index}
            ref={ref => this.gamesRef[index] = ref}>
            <div className={`game-heading ${game.title.length >= this.maxGameTitleChars ? "game-heading-long-title" : ""}`}>
              <span className="game-title" data-text={game.title}>
                {game.title}
              </span>
            </div>
            <img className="game-cover" src={`assets/images/games/${game.image}.png`}
              alt={game.title} title={game.title} />
          </div>
          : null}
        )}
        {/* "All Software" icon */}
        {this.props.games.length > this.props.maxVisibleGames ?
          <div className="all-software" tabIndex={this.props.maxVisibleGames}
            ref={ref => this.gamesRef[this.props.maxVisibleGames] = ref}>
            <div className="all-software-icon">
              <span className="all-software-title">All Software</span>
            </div>
          </div>
          : null}
        <div className="clear"></div>
      </section>
    );
  }
}
