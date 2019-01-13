import React from "react";
import Query from "./query";

const Queries = props => {
  const {
    onCheckboxChange,
    onTextInputChange,
    onSearchQueryClick,
    onClearQueryClick,
    onDeleteQueryClick,
    queries
  } = props;

  return (
    <div>
      {queries.map(query => (
        <Query
          key={query.id}
          onCheckboxChange={onCheckboxChange}
          onTextInputChange={onTextInputChange}
          onSearchQueryClick={onSearchQueryClick}
          onClearQueryClick={onClearQueryClick}
          onDeleteQueryClick={onDeleteQueryClick}
          query={query}
          searchDisabled={query.value.trim().length === 0}
          deleteDisabled={queries.length === 1}
        />
      ))}
    </div>
  );
};

export default Queries;
