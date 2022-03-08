import React, { Component } from "react";
import UserList from "./UserList";

class App extends Component {
  state = {
    users: [], 
  };
// active when call this component to load data from api, i put it hear to just take data one time, this api is random so every time touch this component change the data ==> i dont want that 
  componentDidMount() {
    const results = "100"; // take 100  users as you want
    const requestURL = `https://randomuser.me/api/?results=${results}`;
    fetch(requestURL)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ users: response.results });
        console.log(this.state.users);
      });
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <h2 className="title" data-text="User List">
            User List
          </h2>
        </header>
        {/* give data for userList */}
        <UserList users={this.state.users} /> 
      </React.Fragment>
    );
  }
}

export default App;
