import React, { Component } from "react";

const initialState = {
  displayName: "",
  href: "",
  searchQueryKey: ""
};

class AddURLPanel extends Component {
  state = {
    displayName: "",
    href: "",
    searchQueryKey: ""
  };

  handleFormFieldChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  resetState = () => {
    this.setState(initialState);
  };

  render() {
    const { displayed, handleAddURLSubmit } = this.props;
    const { displayName, href, searchQueryKey } = this.state;
    return (
      <div id="add-url-panel" style={{ display: displayed ? "block" : "none" }}>
        <form
          onSubmit={e => {
            handleAddURLSubmit(e, this.state);
            this.resetState();
          }}
        >
          <div className="ml-2">
            <label htmlFor="add-url-name-input">Name: </label>
            <input
              name="displayName"
              id="add-url-name-input"
              className="ml-2"
              type="text"
              value={displayName}
              onChange={this.handleFormFieldChange}
            />
          </div>
          <div className="ml-2">
            <label htmlFor="add-url-hyperlink-input">Hyperlink: </label>
            <input
              name="href"
              id="add-url-hyperlink-input"
              className="ml-2"
              type="text"
              value={href}
              onChange={this.handleFormFieldChange}
            />
          </div>
          <div className="ml-2">
            <label htmlFor="add-url-search-query-input">
              Search Query Key:{" "}
            </label>
            <input
              name="searchQueryKey"
              id="add-url-search-query-input"
              className="ml-2"
              type="text"
              value={searchQueryKey}
              onChange={this.handleFormFieldChange}
            />
          </div>
          <div>
            <input
              type="submit"
              value="Submit"
              className="m-2 btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default AddURLPanel;
