import React, { Component } from "react";
import { Button } from "react-bootstrap";
import AddURLPanel from "./add-url-panel";

class OptionsButtonRow extends Component {
  state = { addURLPanelOpen: false };

  toggleAddURLPanel = () => {
    this.setState(prevState => {
      return { addURLPanelOpen: !prevState.addURLPanelOpen };
    });
  };

  render() {
    const { addURLPanelOpen } = this.state;
    const {
      handleInvertCheckboxes,
      handleSortQueries,
      handleReverseQueries,
      handleAddURLSubmit
    } = this.props;
    return (
      <div className="light-gray-panel">
        <Button
          bsStyle="light"
          className="m-2 dropdown-toggle"
          onClick={this.toggleAddURLPanel}
        >
          Add URL
        </Button>
        <Button
          className="m-2"
          bsStyle="light"
          onClick={handleInvertCheckboxes}
        >
          Invert Checked
        </Button>
        <Button className="m-2" bsStyle="light" onClick={handleSortQueries}>
          Sort
        </Button>
        <Button className="m-2" bsStyle="light" onClick={handleReverseQueries}>
          Reverse
        </Button>
        <AddURLPanel
          displayed={addURLPanelOpen}
          handleAddURLSubmit={handleAddURLSubmit}
        />
      </div>
    );
  }
}

export default OptionsButtonRow;
