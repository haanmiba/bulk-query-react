import React, { Component } from "react";
import OptionsButtonRow from "./options-button-row";
import SearchButtonRow from "./search-button-row";
import ClearButtonRow from "./clear-button-row";
import DeleteButtonRow from "./delete-button-row";
import SaveButtonRow from "./save-button-row";

class AdvancedPanel extends Component {
  state = { advancedPanelDisplayed: false };

  toggleAdvancedPanelOnClick = () => {
    this.setState(prevState => {
      return { advancedPanelDisplayed: !prevState.advancedPanelDisplayed };
    });
  };

  render() {
    const { advancedPanelDisplayed } = this.state;
    const {
      listName,
      handleInvertCheckboxes,
      handleSortQueries,
      handleReverseQueries,
      handleAddURLSubmit,
      handleSearchMultipleQueries,
      handleFormatSearch,
      handleClearMultipleQueries,
      handleDeleteMultipleQueries,
      checkIfIsUnchecked,
      checkIfIsChecked,
      checkIfIsNonEmptyString,
      handleSaveList,
      handleImportedCSV,
      queries,
      fileName,
      savedLists,
      handleLoadList
    } = this.props;
    return (
      <React.Fragment>
        <a
          href="#!"
          onClick={this.toggleAdvancedPanelOnClick}
          className="ml-2 dropdown-toggle"
        >
          Advanced
        </a>
        <div
          id="advanced-panel"
          style={{ display: advancedPanelDisplayed ? "block" : "none" }}
        >
          <OptionsButtonRow
            handleInvertCheckboxes={handleInvertCheckboxes}
            handleSortQueries={handleSortQueries}
            handleReverseQueries={handleReverseQueries}
            handleAddURLSubmit={handleAddURLSubmit}
          />
          <SearchButtonRow
            listName={listName}
            handleSearchMultipleQueries={handleSearchMultipleQueries}
            handleFormatSearch={handleFormatSearch}
          />
          <ClearButtonRow
            handleClearMultipleQueries={handleClearMultipleQueries}
          />
          <DeleteButtonRow
            handleDeleteMultipleQueries={handleDeleteMultipleQueries}
            checkIfIsUnchecked={checkIfIsUnchecked}
            checkIfIsChecked={checkIfIsChecked}
            checkIfIsNonEmptyString={checkIfIsNonEmptyString}
          />
          <SaveButtonRow
            handleSaveList={handleSaveList}
            handleImportedCSV={handleImportedCSV}
            queries={queries}
            listName={listName}
            fileName={fileName}
            savedLists={savedLists}
            handleLoadList={handleLoadList}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default AdvancedPanel;
