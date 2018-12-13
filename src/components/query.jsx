import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Query extends Component {
  state = {
    value: this.props.query.value
  };

  render() {
    const {
      query,
      onCheckboxChange,
      onTextInputChange,
      onSearchQueryClick,
      onClearQueryClick,
      onDeleteQueryClick,
      searchDisabled,
      deleteDisabled
    } = this.props;
    return (
      <div id={query.id}>
        <input
          type="checkbox"
          checked={query.checked}
          onChange={() => onCheckboxChange(query)}
          className="m-2"
        />
        <input
          type="text"
          onChange={e => onTextInputChange(query, e.target.value)}
          value={query.value}
        />
        <Button
          bsStyle="success"
          className="m-2"
          onClick={() => onSearchQueryClick(query)}
          disabled={searchDisabled}
        >
          Search
        </Button>
        <Button
          bsStyle="warning"
          className="m-2"
          onClick={() => onClearQueryClick(query)}
        >
          Clear
        </Button>
        <Button
          bsStyle="danger"
          className="m-2"
          onClick={() => onDeleteQueryClick(query.id)}
          disabled={deleteDisabled}
        >
          Delete
        </Button>
      </div>
    );
  }
}

export default Query;
