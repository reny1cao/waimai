import React, { Component } from "react";

export default class TabCard extends Component {
  state = {
    name: this.props.name,
    editable: false,
  };

  handleClick = () => {
    this.setState({ editable: !this.state.editable });
    console.log("clicked");
  };

  handleChange = (e) => {
    this.setState({ name: e.target.value });
    this.props.editCategory(this.props.id, e.target.value);
  };
  render() {
    return (
      <div>
        {this.state.editable ? (
          <div>
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <button onClick={this.handleClick} className="del-tab">
              x
            </button>
          </div>
        ) : (
          <p onClick={this.handleClick}>{this.state.name}</p>
        )}
      </div>
    );
  }
}
