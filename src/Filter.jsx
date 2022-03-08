import React, { Component } from "react";

class Filter extends Component {
  state = {};
  render() {
    return (
      <div className="filter-field">
        <form action="">
          <select
            name="sort"
            defaultValue="Sort"
            className="sort"
            id=""
            //on change will call back to handleSort in User List
            onChange={this.props.handleSort}
          >
            <option value="Sort" disabled hidden>
              Sort
            </option>
            <option value="fullName">Full name</option>
            <option value="userName">User name</option>
          </select>
        </form>
      </div>
    );
  }
}

export default Filter;
