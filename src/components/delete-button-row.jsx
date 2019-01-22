import React from "react";
import { Button } from "react-bootstrap";

const DeleteButtonRow = ({
  handleDeleteMultipleQueries,
  checkIfIsUnchecked,
  checkIfIsChecked,
  checkIfIsNonEmptyString
}) => {
  return (
    <div className="light-red-panel">
      <Button
        bsStyle="danger"
        className="m-2"
        onClick={() => handleDeleteMultipleQueries(checkIfIsUnchecked)}
      >
        Delete Checked
      </Button>
      <Button
        bsStyle="danger"
        className="m-2"
        onClick={() => handleDeleteMultipleQueries(checkIfIsChecked)}
      >
        Delete Unchecked
      </Button>
      <Button
        bsStyle="danger"
        className="m-2"
        onClick={() => handleDeleteMultipleQueries(checkIfIsNonEmptyString)}
      >
        Delete Empty Queries
      </Button>
    </div>
  );
};

export default DeleteButtonRow;
