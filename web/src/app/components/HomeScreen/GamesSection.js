import React from "react";
import "./GamesSection.scss";
import GameService from "../../services/GameService";

export default class GamesSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { games: [] };
    this.gamesRef = [];
    this.maxGameTitleChars = 30;
  }

  componentDidMount() {
    GameService.getGames().then(
      response => {
        this.setState({ games: response });
        this.gamesRef[0] ? this.props.gamesLoaded(true) : this.props.gamesLoaded(false);
      },
      error => {
        console.error(error);
        this.props.gamesLoaded(false);
      }
    );
  }

  render() {
    return (
      <div className="games">
        {this.state.games.map((game, index) =>
          {return (index < this.props.maxVisibleGames) ?
            <div className="game" key={game.id} tabIndex={this.props.tabIndexGroup + index}
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
        {this.state.games.length > this.props.maxVisibleGames ?
          <div className="all-software" tabIndex={this.props.tabIndexGroup + this.props.maxVisibleGames}>
            <div className="all-software-icon">
              <span className="all-software-title">All Software</span>
            </div>
          </div>
        : null}
        <div className="clear"></div>
      </div>
    );
  }
}
