import React, { Component } from "react";
import User from "./User";
import Filter from "./Filter";
import Pagination from "./Pagination";
class UserList extends Component {
  state = {
    sort: "",
    currentPage: 1, //the default page
    usersPerPage: 10, //users per page 
  };

  //set sort string to the value from the option
  handleSort = (event) => {
    this.setState({ sort: event.target.value });
  };
//set current page base on what page you clicked on 
  handlePagination = (event) => {
    this.setState({ currentPage: event.target.value });
  };
  render() {
    const totalUsers = this.props.users.length; // total users load from app
    const { currentPage, usersPerPage } = this.state; 
    const indexOfLastUser = currentPage * usersPerPage; //example : current page is 2 ==> last users is 2*10 (10 set up in state) = 20
    const indexOfFirstUser = indexOfLastUser - usersPerPage; //example : current page is 2 ==> the first index user in this page is 20 - 10 = 10

    //use slice to cut a slice from total users take ==> we have a slice of current user in this page
    // also sort if have sort value from option 
    // else do nothing
    const currentUsers = this.props.users
      .slice(indexOfFirstUser, indexOfLastUser)
      .sort((a, b) => {
        if (this.state.sort === "fullName") {
          return (a.name.title + " " + a.name.last + " " + a.name.first)
            .toLowerCase()
            .localeCompare(
              (
                b.name.title +
                " " +
                b.name.last +
                " " +
                b.name.first
              ).toLowerCase()
            );
        }
        if (this.state.sort === "userName") {
          return a.login.username
            .toLowerCase()
            .localeCompare(b.login.username.toLowerCase());
        }
        return 0;
      });

    return (
      <React.Fragment>
          <Filter handleSort={this.handleSort} />
        <div className="user-list">
          {currentUsers.map((user, i) => (
            <User key={i} index={i} user={user} />
          ))}
        </div>
        <Pagination
          totalUsers={totalUsers}
          usersPerPage={usersPerPage}
          handlePagination={this.handlePagination}
        />
      </React.Fragment>
    );
  }
}

export default UserList;
