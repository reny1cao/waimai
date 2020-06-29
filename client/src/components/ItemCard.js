import React, { Component } from "react";
import { Button } from "antd";
import { delItem } from "../actions/RestaurantActions";
import "./ItemCard.css";

class ItemCard extends Component {
  state = {
    id: this.props.id,
    name: this.props.name,
    description: this.props.description,
    price: this.props.price,
    editable: false,
  };

  changeEditMode = () => {
    // editMenuItem()
    this.setState({ editable: !this.state.editable });
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
    this.props.editMenuItems(
      this.props.category,
      e.target.name,
      e.target.value,
      this.props.id
    );
  };

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
    this.props.editMenuItems(
      this.props.category,
      e.target.name,
      e.target.value,
      this.props.id
    );
  };

  handlePriceChange = (e) => {
    this.setState({ price: e.target.value });
    this.props.editMenuItems(
      this.props.category,
      e.target.name,
      e.target.value,
      this.props.id
    );
  };

  renderDefaultView = () => {
    return (
      <div className="menu-wrapper">
        <div className="info">
          <h4>{this.state.name}</h4>
          <p>{this.state.description}</p>
          <p>{this.state.price}</p>
        </div>
        <Button
          shape="circle"
          size="small"
          onClick={() => {
            delItem(this.state.id);
            window.location.reload(false);
          }}
        >
          x
        </Button>
      </div>
    );
  };

  render() {
    return (
      <div className="item-card">
        {this.renderDefaultView()}
        <img src={require("../FoodImg/1.jpg")} alt="food img"></img>
      </div>
    );
  }
}

export default ItemCard;
