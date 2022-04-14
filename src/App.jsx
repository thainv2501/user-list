import React, { useEffect, useState } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [currentUsers, setCurrentUsers] = useState([]);

  const fetchUsers = async () => {
    const results = "100"; // take 100  users as you want
    const requestURL = `https://randomuser.me/api/?results=${results}`;
    // fetch(requestURL)
    //   .then((response) => response.json())
    //   .then((response) => {
    //     setUsers(response.results);
    //   });
    const response = await fetch(requestURL);
    const data = await response.json();
    setUsers(data.results);
  };

  const totalUsers = users.length; // total users load from app

  const pageNumbers = [];
  // example we have 122 user => 122/10 = 12 ==> remain 2 user so we have to ceil to 13
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i); //make a array number for map
  }
  const handleSort = (event) => {
    setSort(event.target.value);
    if (sort === "fullName") {
      setCurrentUsers(
        currentUsers.sort((a, b) => {
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
        })
      );
    }

    if (sort === "userName") {
      setCurrentUsers(
        currentUsers.sort((a, b) => {
          return a.login.username
            .toLowerCase()
            .localeCompare(b.login.username.toLowerCase());
        })
      );
    }
  };

  const handlePagination = (event) => {
    setCurrentPage(event.target.value);
    usersInPage();
  };

  const usersInPage = () => {
    const indexOfLastUser = currentPage * usersPerPage; //example : current page is 2 ==> last users is 2*10 (10 set up in state) = 20
    const indexOfFirstUser = indexOfLastUser - usersPerPage; //example : current page is 2 ==> the first index user in this page is 20 - 10 = 10
    //use slice to cut a slice from total users take ==> we have a slice of current user in this page
    // also sort if have sort value from option
    // else do nothing
    setCurrentUsers(users.slice(indexOfFirstUser, indexOfLastUser));
    console.log(2);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    usersInPage();
  }, []);

  return (
    <React.Fragment>
      <header>
        <h2 className="title" data-text="User List">
          User List
        </h2>
      </header>
      {/* give data for userList */}
      <div className="filter-field">
        <form action="">
          <select
            name="sort"
            defaultValue="Sort"
            className="sort"
            id=""
            //on change will call back to handleSort in User List
            onChange={handleSort}
          >
            <option value="Sort" disabled hidden>
              Sort
            </option>
            <option value="fullName">Full name</option>
            <option value="userName">User name</option>
          </select>
        </form>
      </div>

      {/* list users */}
      <div className="user-list">
        {currentUsers.map((user, i) => {
          const { name, login, picture } = user;
          return (
            <div className="user-card" key={i}>
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
        })}
      </div>

      {/* pagination */}
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number}>
            {" "}
            {/* call back to handlePagination in  Users List */}
            <button value={number} onClick={handlePagination}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default App;
