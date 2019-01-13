import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navbar";
import Queries from "./components/queries";
import { Button } from "react-bootstrap";
import initialState from "./initial-state";

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

  getMaxQueryId = queries => {
    return queries.reduce(
      (max, query) => (query.id > max ? query.id : max),
      queries[0].id
    );
  };

  handleChangeListName = e => {
    const { value } = e.target;
    this.setState({ listName: value });
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

  handleSearchAll = () => {
    this.state.queries.forEach(query => {
      if (query.value.length > 0) {
        this.handleSearchQuery(query);
      }
    });
  };

  handleClearAll = () => {
    const queries = this.state.queries.map(query => {
      query.value = "";
      query.checked = false;
      return query;
    });
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

  handleSearchChecked = () => {
    this.state.queries.forEach(query => {
      if (query.checked) {
        this.handleSearchQuery(query);
      }
    });
  };

  handleSearchUnchecked = () => {
    this.state.queries.forEach(query => {
      if (!query.checked) {
        this.handleSearchQuery(query);
      }
    });
  };

  handleClearChecked = () => {
    const queries = [...this.state.queries];
    queries.forEach(query => {
      if (query.checked) {
        query.value = "";
        return query;
      }
    });
    this.setState({ queries });
  };

  handleClearUnchecked = () => {
    const queries = [...this.state.queries];
    queries.forEach(query => {
      if (!query.checked) {
        query.value = "";
        return query;
      }
    });
    this.setState({ queries });
  };

  handleDeleteChecked = () => {
    const queries = this.state.queries.filter(query => !query.checked);
    if (queries.length === 0) {
      this.handleDeleteAll();
      return;
    }
    this.setState({ queries });
  };

  handleDeleteUnchecked = () => {
    const queries = this.state.queries.filter(query => query.checked);
    if (queries.length === 0) {
      this.handleDeleteAll();
      return;
    }
    this.setState({ queries });
  };

  handleDeleteEmptyCells = () => {
    const queries = this.state.queries.filter(query => query.value.length > 0);
    if (queries.length === 0) {
      this.handleDeleteAll();
      return;
    }
    this.setState({ queries });
  };

  handleAddURLSubmit = e => {
    e.preventDefault();
    const { addUrlForm, urls } = this.state;
    if (
      this.state.urls
        .map(url => url.displayName)
        .includes(addUrlForm.displayName)
    ) {
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

  togglePanelOnClick = e => {
    const { name } = e.target;
    var { openPanels } = this.state;
    openPanels[name] = !openPanels[name];
    this.setState({ openPanels });
  };

  handleAddURLFormFieldChange = e => {
    const { name, value } = e.target;
    var { addUrlForm } = this.state;
    addUrlForm[name] = value;
    this.setState({ addUrlForm });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          numberOfCheckedQueries={
            this.state.queries.filter(query => query.checked).length
          }
          currentURL={this.state.currentURL}
          urlsDisplayed={this.state.urls}
          onChangeURL={this.handleChangeURL}
        />
        <main className="container">
          <input type="text" onChange={this.handleChangeListName} />
          <Queries
            onCheckboxChange={this.handleCheckboxChange}
            onTextInputChange={this.handleTextInputChange}
            onSearchQueryClick={this.handleSearchQuery}
            onClearQueryClick={this.handleClearQuery}
            onDeleteQueryClick={this.handleDeleteQuery}
            queries={this.state.queries}
          />
          <Button
            bsStyle="primary"
            className="m-2"
            onClick={this.handleAddQuery}
            disabled={this.state.queries === this.MAXIMUM_NUMBER_OF_QUERIES}
          >
            Add Query
          </Button>
          <div>
            <Button
              bsStyle="success"
              className="m-2"
              onClick={this.handleSearchAll}
              disabled={
                this.state.queries.filter(
                  query => query.value.trim().length > 0
                ).length === 0
              }
            >
              Search All
            </Button>
            <Button
              bsStyle="warning"
              className="m-2"
              onClick={this.handleClearAll}
            >
              Clear All
            </Button>
            <Button
              bsStyle="danger"
              className="m-2"
              onClick={this.handleDeleteAll}
              disabled={this.state.queries.length === 1}
            >
              Delete All
            </Button>
          </div>
          <div>
            <div className="light-gray-panel">
              <Button
                name="addUrl"
                className="m-2"
                onClick={this.togglePanelOnClick}
              >
                Add URL
              </Button>
              <Button className="m-2" onClick={this.handleInvertCheckboxes}>
                Invert Checked
              </Button>
              <Button className="m-2" onClick={this.handleSortQueries}>
                Sort
              </Button>
              <Button className="m-2" onClick={this.handleReverseQueries}>
                Reverse
              </Button>
              <div
                id="add-url-panel"
                ref="add-url-panel"
                style={{
                  display: this.state.openPanels.addUrl ? "block" : "none"
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
                      value={this.state.addUrlForm.displayName}
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
                      value={this.state.addUrlForm.href}
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
                      value={this.state.addUrlForm.searchQueryKey}
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
              <Button bsStyle="success" className="m-2">
                Format Search
              </Button>
              <Button
                bsStyle="success"
                className="m-2"
                onClick={this.handleSearchChecked}
              >
                Search Checked
              </Button>
              <Button
                bsStyle="success"
                className="m-2"
                onClick={this.handleSearchUnchecked}
              >
                Search Unchecked
              </Button>
            </div>
            <div className="light-yellow-panel">
              <Button
                bsStyle="warning"
                className="m-2"
                onClick={this.handleClearChecked}
              >
                Clear Checked
              </Button>
              <Button
                bsStyle="warning"
                className="m-2"
                onClick={this.handleClearUnchecked}
              >
                Clear Unchecked
              </Button>
            </div>
            <div className="light-red-panel">
              <Button
                bsStyle="danger"
                className="m-2"
                onClick={this.handleDeleteChecked}
              >
                Delete Checked
              </Button>
              <Button
                bsStyle="danger"
                className="m-2"
                onClick={this.handleDeleteUnchecked}
              >
                Delete Unchecked
              </Button>
              <Button
                bsStyle="danger"
                className="m-2"
                onClick={this.handleDeleteEmptyCells}
              >
                Delete Empty Cells
              </Button>
            </div>
            <div className="light-cyan-panel">
              <Button bsStyle="info" className="m-2">
                Save List
              </Button>
              <Button bsStyle="info" className="m-2">
                Load List
              </Button>
              <Button bsStyle="info" className="m-2">
                Import CSV
              </Button>
              <Button bsStyle="info" className="m-2">
                Export CSV
              </Button>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
