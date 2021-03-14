import React from 'react';
import './TopSection.scss';
import TimeWiFiBatteryBar from '@shared/components/TimeWiFiBatteryBar/TimeWiFiBatteryBar';

export default class TopSection extends React.Component {
  constructor(props) {
    super(props);
    this.usersRef = [];
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.handleFocus();
    }
  }

  handleFocus = () => {
    if (this.props.activeRow) {
      this.usersRef[this.props.activeItem].focus();
    }
  }

  render() {
    return (
      <section className="top-section">
        <div className="users" onLoad={this.handleFocus}>
          {this.props.users.map((user, index) =>
            <div className="user" key={user.id} tabIndex={index}
              ref={ref => this.usersRef[index] = ref}>
              <img className={`user-icon ${this.props.shakeAnimation && this.props.activeRow && this.props.activeItem === index ? "shake-animation" : ""}`}
                src={`assets/images/users/${user.image}.png`}
                alt={user.name} title={user.name} />
              <span className="user-name">{user.name}'s Page</span>
            </div>
          )}
        </div>
        <TimeWiFiBatteryBar />
      </section>
    );
  }
}
