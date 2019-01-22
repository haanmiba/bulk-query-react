import React from "react";
import { Button } from "react-bootstrap";

const ClearButtonRow = ({ handleClearMultipleQueries }) => {
  return (
    <div className="light-yellow-panel">
      <Button
        bsStyle="warning"
        className="m-2"
        onClick={() => handleClearMultipleQueries(true)}
      >
        Clear Checked
      </Button>
      <Button
        bsStyle="warning"
        className="m-2"
        onClick={() => handleClearMultipleQueries(false)}
      >
        Clear Unchecked
      </Button>
    </div>
  );
};

export default ClearButtonRow;
