import React, { Component } from "react";
import { Button } from "react-bootstrap";
import FormatSearchPanel from "./format-search-panel";

class SearchButtonRow extends Component {
  state = { formatSearchPanelOpen: false };

  toggleFormatSearchPanel = () => {
    this.setState(prevState => {
      return { formatSearchPanelOpen: !prevState.formatSearchPanelOpen };
    });
  };

  render() {
    const {
      listName,
      handleSearchMultipleQueries,
      handleFormatSearch
    } = this.props;
    const { formatSearchPanelOpen } = this.state;
    return (
      <div className="light-green-panel">
        <Button
          bsStyle="success"
          className="m-2 dropdown-toggle"
          onClick={this.toggleFormatSearchPanel}
        >
          Format Search
        </Button>
        <Button
          bsStyle="success"
          className="m-2"
          onClick={() => handleSearchMultipleQueries(true)}
        >
          Search Checked
        </Button>
        <Button
          bsStyle="success"
          className="m-2"
          onClick={() => handleSearchMultipleQueries(false)}
        >
          Search Unchecked
        </Button>
        <FormatSearchPanel
          listName={listName}
          displayed={formatSearchPanelOpen}
          handleFormatSearch={handleFormatSearch}
        />
      </div>
    );
  }
}

export default SearchButtonRow;
