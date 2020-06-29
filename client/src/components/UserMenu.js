import React, { Component } from "react";
import UserItemCard from "./UserItemCard";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom";
import "react-tabs/style/react-tabs.css";

export default class UserMenu extends Component {
  state = {
    orders: [],
  };

  addOrder = (dish) => {
    this.setState((state) => {
      const list = state.orders.push(dish);
      return list;
    });
    console.log(this.state.orders);
  };

  createCategorys = (props) => {
    return <Tab key={props.id}>{props.category}</Tab>;
  };

  createItems = (props) => {
    return (
      <TabPanel key={props.id}>
        {props.menuItems.map((item) => (
          <UserItemCard
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            category={props.category}
            image={item.images}
            addOrder={this.addOrder}
          />
        ))}
      </TabPanel>
    );
  };

  render() {
    return (
      <div>
        <Link to={{ pathname: "/Cart", state: { cart: this.state.orders } }}>
          <button id="cartButton">Cart</button>
        </Link>
        <Tabs>
          <TabList id="tabList">
            {this.props.menu.map(this.createCategorys)}
          </TabList>
          {this.props.menu.map(this.createItems)}
        </Tabs>
      </div>
    );
  }
}
