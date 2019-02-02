import React, { Component } from "react";
import { Button } from "react-bootstrap";
import FormatSearchOptionsDropdown from "./format-search-options-dropdown";

class FormatSearchPanel extends Component {
  state = { formatSearchOptionsDisplayed: false, textAreaValue: "" };

  handleFormatSearchInsertText = (startPos, endPos) => {
    const { formatSearchTextArea } = this;
    formatSearchTextArea.value =
      formatSearchTextArea.value.substring(0, startPos) +
      "<>" +
      formatSearchTextArea.value.substring(
        endPos,
        formatSearchTextArea.value.length
      );
    this.setState({ textAreaValue: formatSearchTextArea.value });
  };

  handleTextAreaChange = e => {
    const { value } = e.target;
    this.setState({ textAreaValue: value });
  };

  toggleFormatSearchOptions = () => {
    this.setState(prevState => {
      return {
        formatSearchOptionsDisplayed: !prevState.formatSearchOptionsDisplayed
      };
    });
  };

  render() {
    const { displayed, listName, handleFormatSearch } = this.props;
    const { formatSearchOptionsDisplayed, textAreaValue } = this.state;
    return (
      <div
        id="format-search-panel"
        style={{ display: displayed ? "block" : "none" }}
      >
        <Button
          bsStyle="info"
          className="m-2"
          onClick={() =>
            this.handleFormatSearchInsertText(
              this.formatSearchTextArea.selectionStart,
              this.formatSearchTextArea.selectionStart
            )
          }
        >
          {listName}
        </Button>
        <div className="ml-2">
          <textarea
            ref={input => {
              this.formatSearchTextArea = input;
            }}
            value={textAreaValue}
            id="format-search-textarea"
            onChange={this.handleTextAreaChange}
          />
        </div>
        <Button
          bsStyle="success"
          className="m-2 dropdown-toggle"
          onClick={this.toggleFormatSearchOptions}
        >
          Search
        </Button>
        <FormatSearchOptionsDropdown
          displayed={formatSearchOptionsDisplayed}
          handleFormatSearch={(checkValue, allQueries = false) => handleFormatSearch(textAreaValue, checkValue, allQueries)}
        />
      </div>
    );
  }
}

export default FormatSearchPanel;
