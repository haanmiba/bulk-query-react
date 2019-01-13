import React, { Component } from "react";
import MenuDropdown from "./menu-dropdown";

class NavBar extends Component {
  state = {
    dropdownDisplayed: false
  };

  handleClick = () => {
    this.setState({ dropdownDisplayed: !this.state.dropdownDisplayed });
  };

  render() {
    const {
      numberOfCheckedQueries,
      currentURL,
      urlsDisplayed,
      onChangeURL
    } = this.props;
    return (
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          Bulk Query{" "}
          <span className="badge badge-pill badge-secondary">
            {numberOfCheckedQueries}
          </span>{" "}
        </a>
        <MenuDropdown
          currentURL={currentURL}
          urlsDisplayed={urlsDisplayed}
          onChangeURL={onChangeURL}
        />
      </nav>
    );
  }
}

export default NavBar;
