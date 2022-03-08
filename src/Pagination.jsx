import React, { Component } from "react";

class Pagination extends Component {
  state = {};
  render() {
    const { totalUsers, usersPerPage } = this.props;
    const pageNumbers = [];
    // example we have 122 user => 122/10 = 12 ==> remain 2 user so we have to ceil to 13 
    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
      pageNumbers.push(i);//make a array number for map 
    }
    return (
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number}>
            {" "}
            {/* call back to handlePagination in  Users List */}
            <button value={number} onClick={this.props.handlePagination}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default Pagination;
