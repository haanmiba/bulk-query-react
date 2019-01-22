import React from "react";

const SavedListsDropdown = ({ displayed, savedLists, handleLoadList }) => {
  return (
    <div
      className="light-cyan-dropdown-panel ml-2"
      style={{ display: displayed ? "block" : "none" }}
    >
      {savedLists.map(savedList => (
        <a href="#!" onClick={() => handleLoadList(savedList.listName)}>
          {savedList.listName}
        </a>
      ))}
    </div>
  );
};

export default SavedListsDropdown;
