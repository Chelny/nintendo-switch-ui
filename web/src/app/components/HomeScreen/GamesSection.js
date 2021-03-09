import React from "react";
import "./GamesSection.scss";
import GameService from "../../services/GameService";

export default class GamesSection extends React.Component {
  constructor() {
    super();
    this.state = { games: [] };
    this.gamesRef = [];
    this.maxVisibleGames = 12;
    this.maxGameTitleChars = 30;
  }

  componentDidMount() {
    GameService.getGames().then(
      response => {
        this.setState({ games: response });
        this.gamesRef[0] && this.gamesRef[0].focus();
      },
      error => console.error(error)
    );
  }

  render() {
    return (
      <div className="games">
        { this.state.games.map((game, index) =>
          { return (index < this.maxVisibleGames) ?
            <div className="game" key={game.id} tabIndex={index} ref={ref => this.gamesRef[index] = ref}>
              <div className={`game-heading ${game.title.length >= this.maxGameTitleChars ? "game-heading-long-title" : ""}`}>
                <span className="game-title" data-text={game.title}>
                  {game.title}
                </span>
              </div>
              <img className="game-cover" src={`assets/images/games/${game.image}.png`}
                alt={game.title} title={game.title} />
            </div>
          : null }
        ) }
        { this.state.games.length >= this.maxVisibleGames ?
          <div className="all-software">
            <div className="all-software-icon"></div>
          </div>
        : null }
        <div className="clear"></div>
      </div>
    );
  }
}
