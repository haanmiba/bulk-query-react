import React from "react";

const FormatSearchOptionsDropdown = props => {
  const { displayed, handleFormatSearch, textAreaValue } = props;
  return (
    <div
      id="format-search-dropdown-panel"
      className="green-dropdown-panel ml-2"
      style={{ display: displayed ? "block" : "none" }}
    >
      <a href="#!" onClick={() => handleFormatSearch(textAreaValue, true)}>
        Search Checked
      </a>
      <a href="#!" onClick={() => handleFormatSearch(textAreaValue, false)}>
        Search Unchecked
      </a>
      <a href="#!" onClick={() => handleFormatSearch(textAreaValue, {}, true)}>
        Search All
      </a>
    </div>
  );
};

export default FormatSearchOptionsDropdown;
