import React from "react";

const FormatSearchOptionsDropdown = ({
  displayed,
  handleFormatSearch
}) => {
  return (
    <div
      id="format-search-dropdown-panel"
      className="green-dropdown-panel ml-2"
      style={{ display: displayed ? "block" : "none" }}
    >
      <a href="#!" onClick={() => handleFormatSearch(true)}>
        Search Checked
      </a>
      <a href="#!" onClick={() => handleFormatSearch(false)}>
        Search Unchecked
      </a>
      <a href="#!" onClick={() => handleFormatSearch({}, true)}>
        Search All
      </a>
    </div>
  );
};

export default FormatSearchOptionsDropdown;
