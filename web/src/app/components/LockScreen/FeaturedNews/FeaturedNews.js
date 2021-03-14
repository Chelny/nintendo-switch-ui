import React from "react";
import "./FeaturedNews.scss";
import FeaturedNewsService from "@services/FeaturedNewsService";
import Card from "@shared/components/Card/Card";
import ControllerButton from "@shared/components/ControllerButton/ControllerButton";
import UnlockBar from "@shared/components/UnlockBar/UnlockBar";
import { LockScreenSection } from "@shared/enums/LockScreenSection";

export default class FeaturedNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featuredNews: []
    };
  }

  componentDidMount() {
    FeaturedNewsService.getFeaturedNews().then(
      response => {
        response.forEach(item => {
          item.image = `assets/images/featured-news/${item.image}.png`;
        });
        this.setState({ featuredNews: response });
      },
      error => console.error(error)
    );
  }

  render() {
    return (
      <section className={`featured-news ${this.props.expanded === LockScreenSection.FeaturedNews ? "featured-news--expand" : this.props.expanded === LockScreenSection.Home ? "featured-news--collapse" : ""} ${this.props.scaleAnimation ? "scale-animation" : ""}`}>
        <div className="featured-news__list">
          {this.state.featuredNews.map(item =>
            <Card key={item.id} {...item} boxShadowAnimation={this.props.boxShadowAnimation} />)}
        </div>
        {this.props.expanded === LockScreenSection.FeaturedNews ?
          <UnlockBar bulletsCount={this.props.unlockBulletsCount}
            progress={this.props.unlockProgress} /> :
          <ControllerButton button="Y" text="Featured News" />}
      </section>
    );
  }
}
