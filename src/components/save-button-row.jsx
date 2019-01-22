import React, { Component } from "react";
import { Button } from "react-bootstrap";
import ReactFileReader from "react-file-reader";
import { CSVLink } from "react-csv";
import SavedListsDropdown from "./saved-lists-dropdown";

class SaveButtonRow extends Component {
  state = { savedListsDropdownOpen: false };

  toggleSavedListsDropdown = () => {
    this.setState(prevState => {
      return { savedListsDropdownOpen: !prevState.savedListsDropdownOpen };
    });
  };

  render() {
    const {
      handleSaveList,
      handleImportedCSV,
      queries,
      listName,
      fileName,
      savedLists,
      handleLoadList
    } = this.props;
    const { savedListsDropdownOpen } = this.state;
    return (
      <div className="light-cyan-panel">
        <Button bsStyle="info" className="m-2" onClick={handleSaveList}>
          Save List
        </Button>
        <Button
          bsStyle="info"
          className="m-2 dropdown-toggle"
          onClick={this.toggleSavedListsDropdown}
        >
          Load List
        </Button>
        <Button bsStyle="info" className="m-2">
          <ReactFileReader handleFiles={handleImportedCSV} fileTypes=".csv">
            Import CSV
          </ReactFileReader>
        </Button>
        <CSVLink
          className="btn btn-info m-2"
          data={queries.map(query => {
            return [query.value];
          })}
          headers={[listName]}
          filename={fileName}
        >
          Export CSV
        </CSVLink>
        <SavedListsDropdown
          displayed={savedListsDropdownOpen}
          savedLists={savedLists}
          handleLoadList={handleLoadList}
        />
      </div>
    );
  }
}

export default SaveButtonRow;
