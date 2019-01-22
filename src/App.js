import React, { Component } from "react";
import NavBar from "./components/navbar";
import Queries from "./components/queries";
import { Button } from "react-bootstrap";
import initialState from "./initial-state";
import AllButtonRow from "./components/all-button-row";
import AdvancedPanel from "./components/advanced-panel";
const PapaParse = require("papaparse/papaparse.min.js");

const MAXIMUM_NUMBER_OF_QUERIES = 100;

class App extends Component {
  constructor() {
    super();
    if (localStorage.getItem("state") === null) {
      this.state = initialState;
      localStorage.setItem("state", JSON.stringify(this.state));
    } else {
      this.state = JSON.parse(localStorage.getItem("state"));
    }
  }

  componentDidUpdate() {
    localStorage.setItem("state", JSON.stringify(this.state));
  }

  createFilename = str => {
    str = str.toLowerCase();
    str = str.replace(/(^\s+|[^a-zA-Z0-9 ]+|\s+$)/g, "");
    str = str.replace(/\s+/g, "-");
    return str;
  };

  handleListNameChange = e => {
    let { value } = e.target;
    this.setState({ listName: value });

    value = this.createFilename(value);
    this.setState({
      fileName: value.length > 0 ? `${value}.csv` : "bulk-query.csv"
    });
  };

  handleChangeURL = currentURL => {
    this.setState({ currentURL });
  };

  handleCheckboxChange = query => {
    const queries = [...this.state.queries];
    const index = queries.indexOf(query);
    queries[index] = { ...query };
    queries[index].checked = !queries[index].checked;
    this.setState({ queries });
  };

  handleTextInputChange = (query, value) => {
    const queries = [...this.state.queries];
    const index = queries.indexOf(query);
    queries[index] = { ...query };
    queries[index].value = value;
    queries[index].checked = value.trim().length > 0;
    this.setState({ queries });
  };

  getMaxQueryId = queries => {
    return queries.reduce(
      (max, query) => (query.id > max ? query.id : max),
      queries[0].id
    );
  };

  handleAddQuery = () => {
    const queries = [...this.state.queries];
    queries.push({
      id: this.getMaxQueryId(this.state.queries) + 1,
      value: "",
      checked: false
    });
    this.setState({ queries });
  };

  handleSearchQuery = query => {
    if (query.value.trim().length === 0) {
      return;
    }
    console.log(query);
    const { href, searchQueryKey } = this.state.currentURL;
    let searchURL = new URL(href);
    searchURL.searchParams.set(searchQueryKey, query.value.trim());
    window.open(searchURL, "_blank");
  };

  handleClearQuery = query => {
    const queries = [...this.state.queries];
    const index = queries.indexOf(query);
    queries[index] = { ...query };
    queries[index].value = "";
    queries[index].checked = false;
    this.setState({ queries });
  };

  handleDeleteQuery = queryId => {
    const queries = this.state.queries.filter(query => query.id !== queryId);
    this.setState({ queries });
  };

  handleDeleteAll = () => {
    const queries = [{ id: 0, value: "", checked: false }];
    this.setState({ queries });
  };

  handleInvertCheckboxes = () => {
    const queries = this.state.queries.map(query => {
      query.checked = !query.checked;
      return query;
    });
    this.setState({ queries });
  };

  handleSortQueries = () => {
    const queries = [...this.state.queries];
    queries.sort((a, b) =>
      a.value > b.value ? 1 : b.value > a.value ? -1 : 0
    );
    this.setState({ queries });
  };

  handleReverseQueries = () => {
    const queries = [...this.state.queries];
    queries.reverse();
    this.setState({ queries });
  };

  handleSearchMultipleQueries = (value, allQueries = false) => {
    const { queries } = this.state;
    queries.forEach(query => {
      if (query.checked === value || allQueries) {
        this.handleSearchQuery(query);
      }
    });
  };

  handleClearMultipleQueries = (value, allQueries = false) => {
    const queries = [...this.state.queries];
    queries.forEach(query => {
      if (query.checked === value || allQueries) {
        query.value = "";
        query.checked = false;
        return query;
      }
    });
    this.setState({ queries });
  };

  checkIfIsChecked = query => {
    return query.checked;
  };

  checkIfIsUnchecked = query => {
    return !query.checked;
  };

  checkIfIsNonEmptyString = query => {
    return query.value.length > 0;
  };

  handleDeleteMultipleQueries = evalFunc => {
    const queries = this.state.queries.filter(query => evalFunc(query));
    if (queries.length === 0) {
      this.handleDeleteAll();
      return;
    }
    this.setState({ queries });
  };

  handleAddURLSubmit = (e, formValues) => {
    e.preventDefault();
    const { displayName } = formValues;
    const { urls } = this.state;
    if (urls.map(url => url.displayName).includes(displayName)) {
      alert(`'${displayName}' is already stored.`);
    } else {
      urls.push(formValues);
      this.setState({ urls });
    }
  };

  handleFormatSearch = (textAreaValue, checkValue, allQueries = false) => {
    const { queries } = this.state;
    queries.forEach(query => {
      if (query.checked === checkValue || allQueries) {
        var formattedQuery = { ...query };
        formattedQuery.value = textAreaValue.split("<>").join(query.value);
        this.handleSearchQuery(formattedQuery);
      }
    });
  };

  handleSaveList = () => {
    const { savedLists, listName, queries } = this.state;
    if (listName.length === 0) {
      alert("Please enter a list name before saving the list.");
      return;
    }
    const index = savedLists
      .map(savedList => savedList.listName)
      .indexOf(listName);
    if (index !== -1) {
      const savedList = savedLists[index];
      savedList.queries = queries;
    } else {
      savedLists.push({ listName: listName, queries: queries });
    }
    this.setState({ savedLists });
  };

  handleLoadList = name => {
    const { savedLists } = this.state;
    const index = savedLists.map(savedList => savedList.listName).indexOf(name);
    const savedList = savedLists[index];
    const listName = savedList.listName;
    const queries = savedList.queries;
    this.setState({ listName, queries });
  };

  importCSVData = data => {
    const listName = data[0][0];
    const queries = [];
    for (let i = 1; i < data.length; i++) {
      queries.push({
        id: i - 1,
        value: data[i][0],
        checked: data[i][0].length > 0
      });
    }
    this.setState({ listName, queries });
  };

  handleImportedCSV = files => {
    var reader = new FileReader();
    reader.onload = e => {
      const csvData = PapaParse.parse(reader.result);
      if (csvData.data[0].length !== 1) {
        alert(
          `Invalid CSV file. CSV file should only have 1 column. The CSV file provided had ${
            csvData.data[0].length
          } columns.`
        );
        return false;
      }
      this.importCSVData(csvData.data);
    };
    reader.readAsText(files[0]);
  };

  render() {
    const {
      queries,
      currentURL,
      urls,
      listName,
      fileName,
      savedLists
    } = this.state;
    return (
      <React.Fragment>
        <NavBar
          numberOfCheckedQueries={queries.filter(query => query.checked).length}
          currentURL={currentURL}
          urlsDisplayed={urls}
          onChangeURL={this.handleChangeURL}
        />
        <main className="container">
          <div className="text-center">
            <input
              id="list-name-field"
              type="text"
              value={listName}
              onChange={this.handleListNameChange}
              className="mt-2"
              placeholder="List Name"
            />
          </div>
          <Queries
            onCheckboxChange={this.handleCheckboxChange}
            onTextInputChange={this.handleTextInputChange}
            onSearchQueryClick={this.handleSearchQuery}
            onClearQueryClick={this.handleClearQuery}
            onDeleteQueryClick={this.handleDeleteQuery}
            queries={queries}
          />
          <Button
            bsStyle="primary"
            className="m-2"
            onClick={this.handleAddQuery}
            disabled={queries === MAXIMUM_NUMBER_OF_QUERIES}
          >
            Add Query
          </Button>
          <AllButtonRow
            onSearchAllClick={this.handleSearchMultipleQueries}
            onClearAllClick={this.handleClearMultipleQueries}
            onDeleteAllClick={this.handleDeleteAll}
            searchAllDisabled={
              queries.filter(query => query.value.trim().length > 0).length ===
              0
            }
            deleteAllDisabled={queries.length === 1}
          />
          <AdvancedPanel
            listName={listName}
            handleInvertCheckboxes={this.handleInvertCheckboxes}
            handleSortQueries={this.handleSortQueries}
            handleReverseQueries={this.handleReverseQueries}
            handleAddURLSubmit={this.handleAddURLSubmit}
            handleSearchMultipleQueries={this.handleSearchMultipleQueries}
            handleFormatSearch={this.handleFormatSearch}
            handleClearMultipleQueries={this.handleClearMultipleQueries}
            handleDeleteMultipleQueries={this.handleDeleteMultipleQueries}
            checkIfIsUnchecked={this.checkIfIsUnchecked}
            checkIfIsChecked={this.checkIfIsChecked}
            checkIfIsNonEmptyString={this.checkIfIsNonEmptyString}
            handleSaveList={this.handleSaveList}
            handleImportedCSV={this.handleImportedCSV}
            queries={queries}
            fileName={fileName}
            savedLists={savedLists}
            handleLoadList={this.handleLoadList}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
