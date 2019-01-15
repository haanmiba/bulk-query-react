import React from "react";
import { Button } from "react-bootstrap";

const AllButtonRow = ({
  onSearchAllClick,
  onClearAllClick,
  onDeleteAllClick,
  searchAllDisabled,
  deleteAllDisabled
}) => {
  return (
    <div>
      <Button
        bsStyle="success"
        className="m-2"
        onClick={() => onSearchAllClick({}, true)}
        disabled={searchAllDisabled}
      >
        Search All
      </Button>
      <Button
        bsStyle="warning"
        className="m-2"
        onClick={() => onClearAllClick({}, true)}
      >
        Clear All
      </Button>
      <Button
        bsStyle="danger"
        className="m-2"
        onClick={onDeleteAllClick}
        disabled={deleteAllDisabled}
      >
        Delete All
      </Button>
    </div>
  );
};

export default AllButtonRow;
