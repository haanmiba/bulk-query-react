import React from "react";

const SavedListsDropdown = ({
  displayed,
  savedLists,
  handleLoadList,
  handleClickList
}) => {
  return (
    <div
      className="light-cyan-dropdown-panel ml-2"
      style={{ display: displayed ? "block" : "none" }}
    >
      {savedLists.map(savedList => (
        <a
          href="#!"
          onClick={() => {
            handleLoadList(savedList.listName);
            handleClickList();
          }}
        >
          {savedList.listName}
        </a>
      ))}
    </div>
  );
};

export default SavedListsDropdown;
