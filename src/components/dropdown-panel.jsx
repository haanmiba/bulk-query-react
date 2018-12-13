import React, { Component } from "react";
import { Button, Panel } from "react-bootstrap";

class DropdownPanel extends Component {
  state = { isOpen: false };

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div>
        <Button onClick={this.toggleOpen}>Toggle</Button>
        <br />
        <Panel
          className="in"
          id="collapsible-panel-1"
          expanded={this.state.isOpen}
        >
          <Panel.Collapse>
            <Panel.Body>
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
      </div>
    );
  }
}

export default DropdownPanel;
