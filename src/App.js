import React, { Component } from "react";
import NavBar from "./components/navbar";
import Queries from "./components/queries";
import { Button } from "react-bootstrap";
import initialState from "./initial-state";
import { CSVLink } from "react-csv";
import ReactFileReader from "react-file-reader";
const PapaParse = require("papaparse/papaparse.min.js");

class App extends Component {
  MAXIMUM_NUMBER_OF_QUERIES = 100;

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

  handleAddURLSubmit = e => {
    e.preventDefault();
    const { addUrlForm, urls } = this.state;
    if (urls.map(url => url.displayName).includes(addUrlForm.displayName)) {
      alert(`'${addUrlForm.displayName}' is already stored.`);
    } else {
      urls.push({
        displayName: addUrlForm.displayName,
        href: addUrlForm.href,
        searchQueryKey: addUrlForm.searchQueryKey
      });
      this.setState({ urls });
      this.setState({
        addUrlForm: { displayName: "", href: "", searchQueryKey: "" }
      });
    }
  };

  handleAddURLFormFieldChange = e => {
    const { name, value } = e.target;
    var { addUrlForm } = this.state;
    addUrlForm[name] = value;
    this.setState({ addUrlForm });
  };

  handleFormatSearchInsertText = (startPos, endPos) => {
    const { formatSearchText } = this;
    formatSearchText.value =
      formatSearchText.value.substring(0, startPos) +
      "<>" +
      formatSearchText.value.substring(endPos, formatSearchText.value.length);
  };

  handleFormatSearch = (value, allQueries = false) => {
    const { queries } = this.state;
    queries.forEach(query => {
      if (query.checked === value || allQueries) {
        var formattedQuery = { ...query };
        formattedQuery.value = this.formatSearchText.value
          .split("<>")
          .join(query.value);
        this.handleSearchQuery(formattedQuery);
      }
    });
  };

  togglePanelOnClick = e => {
    const { name } = e.target;
    var { openPanels } = this.state;
    openPanels[name] = !openPanels[name];
    this.setState({ openPanels });
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
          `Invalid CSV file. CSV file can have 1 column. The CSV file provided had ${
            csvData.data[0].length
          }`
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
      openPanels,
      addUrlForm,
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
            disabled={queries === this.MAXIMUM_NUMBER_OF_QUERIES}
          >
            Add Query
          </Button>
          <div>
            <Button
              bsStyle="success"
              className="m-2"
              onClick={() => this.handleSearchMultipleQueries({}, true)}
              disabled={
                queries.filter(query => query.value.trim().length > 0)
                  .length === 0
              }
            >
              Search All
            </Button>
            <Button
              bsStyle="warning"
              className="m-2"
              onClick={() => this.handleClearMultipleQueries({}, true)}
            >
              Clear All
            </Button>
            <Button
              bsStyle="danger"
              className="m-2"
              onClick={this.handleDeleteAll}
              disabled={queries.length === 1}
            >
              Delete All
            </Button>
          </div>
          <a
            name="advancedPanel"
            href="#!"
            onClick={this.togglePanelOnClick}
            className="ml-2 dropdown-toggle"
          >
            Advanced
          </a>
          <div
            id="advanced-panel"
            style={{
              display: openPanels.advancedPanel ? "block" : "none"
            }}
          >
            <div className="light-gray-panel">
              <Button
                name="addUrl"
                bsStyle="light"
                className="m-2 dropdown-toggle"
                onClick={this.togglePanelOnClick}
              >
                Add URL
              </Button>
              <Button
                className="m-2"
                bsStyle="light"
                onClick={this.handleInvertCheckboxes}
              >
                Invert Checked
              </Button>
              <Button
                className="m-2"
                bsStyle="light"
                onClick={this.handleSortQueries}
              >
                Sort
              </Button>
              <Button
                className="m-2"
                bsStyle="light"
                onClick={this.handleReverseQueries}
              >
                Reverse
              </Button>
              <div
                id="add-url-panel"
                style={{
                  display: openPanels.addUrl ? "block" : "none"
                }}
              >
                <form onSubmit={this.handleAddURLSubmit}>
                  <div className="ml-2">
                    <label htmlFor="add-url-name-input">Name: </label>
                    <input
                      name="displayName"
                      id="add-url-name-input"
                      type="text"
                      className="ml-2"
                      value={addUrlForm.displayName}
                      onChange={this.handleAddURLFormFieldChange}
                    />
                  </div>
                  <div className="ml-2">
                    <label htmlFor="add-url-hyperlink-input">Hyperlink: </label>
                    <input
                      name="href"
                      id="add-url-hyperlink-input"
                      type="text"
                      className="ml-2"
                      value={addUrlForm.href}
                      onChange={this.handleAddURLFormFieldChange}
                    />
                  </div>
                  <div className="ml-2">
                    <label htmlFor="add-url-search-query-key-input">
                      Search Query Key:
                    </label>
                    <input
                      name="searchQueryKey"
                      id="add-url-search-query-key-input"
                      type="text"
                      className="ml-2"
                      value={addUrlForm.searchQueryKey}
                      onChange={this.handleAddURLFormFieldChange}
                    />
                  </div>
                  <div>
                    <input
                      type="submit"
                      value="Submit"
                      className="m-2 btn btn-primary"
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="light-green-panel">
              <Button
                name="formatSearch"
                bsStyle="success"
                className="m-2 dropdown-toggle"
                onClick={this.togglePanelOnClick}
              >
                Format Search
              </Button>
              <Button
                bsStyle="success"
                className="m-2"
                onClick={() => this.handleSearchMultipleQueries(true)}
              >
                Search Checked
              </Button>
              <Button
                bsStyle="success"
                className="m-2"
                onClick={() => this.handleSearchMultipleQueries(false)}
              >
                Search Unchecked
              </Button>
              <div
                id="format-search-panel"
                style={{
                  display: openPanels.formatSearch ? "block" : "none"
                }}
              >
                <Button
                  bsStyle="info"
                  className="m-2"
                  onClick={() =>
                    this.handleFormatSearchInsertText(
                      this.formatSearchText.selectionStart,
                      this.formatSearchText.selectionEnd
                    )
                  }
                >
                  {listName}
                </Button>
                <div className="ml-2">
                  <textarea
                    ref={input => {
                      this.formatSearchText = input;
                    }}
                    id="format-search-textarea"
                  />
                </div>
                <Button
                  name="formatSearchOptions"
                  bsStyle="success"
                  className="m-2 dropdown-toggle"
                  onClick={this.togglePanelOnClick}
                >
                  Search
                </Button>
                <div
                  id="format-search-dropdown-panel"
                  className="green-dropdown-panel ml-2"
                  style={{
                    display: openPanels.formatSearchOptions ? "block" : "none"
                  }}
                >
                  <a
                    href="#!"
                    id="list-format-search-checked"
                    onClick={() => this.handleFormatSearch(true)}
                  >
                    Search Checked
                  </a>
                  <a
                    href="#!"
                    id="list-format-search-unchecked"
                    onClick={() => this.handleFormatSearch(false)}
                  >
                    Search Unchecked
                  </a>
                  <a
                    href="#!"
                    id="list-format-search-all"
                    onClick={() => this.handleFormatSearchAll(true, true)}
                  >
                    Search All
                  </a>
                </div>
              </div>
            </div>
            <div className="light-yellow-panel">
              <Button
                bsStyle="warning"
                className="m-2"
                onClick={() => this.handleClearMultipleQueries(true)}
              >
                Clear Checked
              </Button>
              <Button
                bsStyle="warning"
                className="m-2"
                onClick={() => this.handleClearMultipleQueries(false)}
              >
                Clear Unchecked
              </Button>
            </div>
            <div className="light-red-panel">
              <Button
                bsStyle="danger"
                className="m-2"
                onClick={() =>
                  this.handleDeleteMultipleQueries(this.checkIfIsUnchecked)
                }
              >
                Delete Checked
              </Button>
              <Button
                bsStyle="danger"
                className="m-2"
                onClick={() =>
                  this.handleDeleteMultipleQueries(this.checkIfIsChecked)
                }
              >
                Delete Unchecked
              </Button>
              <Button
                bsStyle="danger"
                className="m-2"
                onClick={() =>
                  this.handleDeleteMultipleQueries(this.checkIfIsNonEmptyString)
                }
              >
                Delete Empty Cells
              </Button>
            </div>
            <div className="light-cyan-panel">
              <Button
                bsStyle="info"
                className="m-2"
                onClick={this.handleSaveList}
              >
                Save List
              </Button>
              <Button
                name="loadList"
                bsStyle="info"
                className="m-2 dropdown-toggle"
                onClick={this.togglePanelOnClick}
              >
                Load List
              </Button>
              <Button bsStyle="info" className="m-2">
                <ReactFileReader
                  handleFiles={this.handleImportedCSV}
                  fileTypes=".csv"
                >
                  Import CSV
                </ReactFileReader>
              </Button>

              <CSVLink
                className="btn btn-info m-2"
                data={queries.map(query => {
                  return [query.value];
                })}
                headers={[listName]}
                filename={fileName}
              >
                Export CSV
              </CSVLink>
              <div
                className="light-cyan-dropdown-panel ml-2"
                style={{
                  display: openPanels.loadList ? "block" : "none"
                }}
              >
                {savedLists.map(savedList => (
                  <a
                    href="#!"
                    onClick={() => this.handleLoadList(savedList.listName)}
                  >
                    {savedList.listName}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
