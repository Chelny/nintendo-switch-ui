import React from "react";
import "./UsersSection.scss";
import UserService from "../../services/UserService";

export default class UsersSection extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
    this.usersRef = [];
  }

  componentDidMount() {
    UserService.getUsers().then(
      response => {
        this.setState({ users: response });
      },
      error => console.error(error)
    );
  }

  render() {
    return (
      <div className="users">
        { this.state.users.map((user, index) =>
          <div className="user" key={user.id} tabIndex={index} ref={ref => this.usersRef[index] = ref}>
            <img className="user-icon" src={`assets/images/users/${user.image}.png`}
              alt={user.name} title={user.name} />
            <span className="user-name">{user.name}'s Page</span>
          </div>
        ) }
      </div>
    );
  }
}
