import React from 'react';
import './Navigation.scss';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.navigationRef = [];
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.handleFocus();
    }
  }

  handleFocus = () => {
    if (this.props.activeRow) {
      this.navigationRef[this.props.activeItem].focus();
    }
  }

  render() {
    return (
      <section className="navigation" onLoad={this.handleFocus}>
        {this.props.navItems.map((navItem, index) =>
          <div className="nav-item" key={navItem.id} tabIndex={index}
            ref={ref => this.navigationRef[index] = ref}>
            <img className={`nav-item-icon ${this.props.shakeAnimation && this.props.activeRow && this.props.activeItem === index ? "shake-animation" : ""}`}
              src={`assets/images/navigation/${navItem.image}.png`}
              alt={navItem.title} title={navItem.title} />
            <span className="nav-item-title">{navItem.title}</span>
          </div>
        )}
      </section>
    );
  }
}
