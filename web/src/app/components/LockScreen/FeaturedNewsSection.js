import React from "react";
import "./FeaturedNewsSection.scss";
import { LockScreenSection } from "../../shared/enums/LockScreenSection";
import FeaturedNewsService from "../../services/FeaturedNewsService";
import Card from "../../shared/components/Card/Card";
import ConsoleButtonIcon from "../../shared/components/ConsoleButtonIcon/ConsoleButtonIcon";
import UnlockBar from "../../shared/components/UnlockBar/UnlockBar";

export default class FeaturedNewsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featuredNews: []
    };
  }

  componentDidMount() {
    FeaturedNewsService.getFeaturedNews().then(
      response => {
        this.setState({ featuredNews: response });
      },
      error => console.error(error)
    );
  }

  render() {
    return (
      <section className={`to-featured-news ${this.props.expanded === LockScreenSection.FeaturedNews ? "to-featured-news--expand" : this.props.expanded === LockScreenSection.Home ? "to-featured-news--collapse" : ""} ${this.props.scaleAnimation ? "scale-animation" : ""}`}>
        <div className="featured-news-list">
          {this.state.featuredNews.map(item =>
            <Card key={item.id} image={item.image} boxShadowAnimation={this.props.boxShadowAnimation} />
          )}
        </div>
        {this.props.expanded === LockScreenSection.FeaturedNews ?
          <UnlockBar bulletsCount={this.props.unlockBulletsCount}
            progress={this.props.unlockProgress} />
          :
          <div className="to-featured-news-featured-news">
            <ConsoleButtonIcon content="Y" />
            <p className="to-featured-news-featured-news-text">
              Featured News
            </p>
          </div>}
      </section>
    );
  }
}
