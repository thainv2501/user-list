import React, { Component } from "react";

class User extends Component {
  state = {};

  render() {
    const { name, login, picture } = this.props.user;
    return (
      <div className="user-card">
        <div className="user-img">
          <img src={picture.thumbnail} alt="" />
        </div>

        <div className="user-information">
          <p className="full-name">
             {name.title + " " + name.last + " " + name.first}
          </p>
          <p className="user-name"> {login.username}</p>
        </div>
      </div>
    );
  }
}

export default User;
