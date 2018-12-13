import React, { Component } from "react";

class MenuDropdown extends Component {
  state = { isOpen: false };

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
    const { currentURL, urlsDisplayed, onChangeURL } = this.props;
    return (
      <div className="dropdown" onClick={this.toggleOpen}>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
        >
          {currentURL.displayName}
        </button>
        <div className={menuClass} aria-labelledby="dropdownMenuButton">
          {urlsDisplayed.map(url => (
            <a
              className="dropdown-item"
              href="#nogo"
              onClick={() => onChangeURL(url)}
            >
              {url.displayName}
            </a>
          ))}
        </div>
      </div>
    );
  }
}

export default MenuDropdown;
