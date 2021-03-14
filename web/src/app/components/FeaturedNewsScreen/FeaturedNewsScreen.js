import React from 'react';
import './FeaturedNewsScreen.scss';
import ControllerButton from '@shared/components/ControllerButton/ControllerButton';
import { Screen } from "@shared/enums/Screen";

export default class FeaturedNewsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.newsScreenRef = React.createRef();
  }

  componentDidMount() {
    this.handleBlur();
  }

  handleBlur = () => {
    this.newsScreenRef.current.focus();
  }

  handleKeyDown = (event) => {
    const keyCode = event.which || event.keyCode || 0;

    switch (keyCode) {
      case 66: // B button
      case 98:
        this.props.onKeyDown(Screen.Home);
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="featured-news-screen" tabIndex="0" ref={this.newsScreenRef}
        onBlur={this.handleBlur} onKeyDown={this.handleKeyDown}>
        Nothing to see here. Press &nbsp;<ControllerButton button="B" small={true} />&nbsp; to go to the home screen.
      </div>
    )
  }
}
