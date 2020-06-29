import React from "react";
import Button from "react-bootstrap/Button";
import "./SelectUser.css";

class SelectUser extends React.Component {
  render() {
    const { title, handleClick } = this.props;

    return (
      <div className="login-form__container">
        <div className="select-user__grid">
          <i class="fas fa-users"></i>
          <div id="header">
            <h4 id="title">{title}</h4>
            <Button
              value="Customer"
              variant="outline-secondary"
              onClick={handleClick}
              className="select__submit-button"
            >
              Customer
            </Button>
            <Button
              value="Restaurant"
              variant="outline-secondary"
              onClick={handleClick}
              className="select__submit-button"
            >
              Restaurant
            </Button>
            <Button
              value="Admin"
              variant="outline-secondary"
              onClick={handleClick}
              className="select__submit-button"
            >
              Admin
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectUser;
