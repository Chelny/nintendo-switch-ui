import React from "react";
import "./NavigationSection.scss";
import NavigationService from "../../services/NavigationService";

export default class NavigationSection extends React.Component {
  constructor() {
    super();
    this.state = {
      navigation: []
    };
    this.navRef = [];
  }

  componentDidMount() {
    NavigationService.getNavigation().then(
      response => {
        this.setState({ navigation: response });
      },
      error => console.error(error)
    );
  }

  render() {
    return (
      <div className="navigation">
        { this.state.navigation.map((navItem, index) =>
          <div className="nav-item" key={navItem.id} tabIndex={index} ref={ref => this.navRef[index] = ref}>
            <img className="nav-item-icon" src={`assets/images/navigation/${navItem.image}.png`}
              alt={navItem.title} title={navItem.title} />
            <span className="nav-item-title">{navItem.title}</span>
          </div>
        ) }
      </div>
    );
  }
}
