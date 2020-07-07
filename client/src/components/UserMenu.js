import React, { Component } from "react";
import UserItemCard from "./UserItemCard";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom";
import "react-tabs/style/react-tabs.css";


export default class UserMenu extends Component {
  state = {
    orders: [],
    menu: [{
      _id: 5,
      categoryName: "Most Popular",
      items: [{
        _id: 6,
        name: "Cream Corn Soup with Crab Meat",
        description: "Sweet and testy",
        images: "../FoodImg/1.jpg",
        price: 15.95
      }]
    },
    {
      _id: 0,
      categoryName: "Appeteasers",
      items: [{
        _id: 4,
        name: "3 Chicken Wings",
        description: "Tender, Spicy and Juicy. Original or Peri-Crusted",
        images: "../FoodImg/1.jpg",
        price: 12,
      }, {
        _id: 1,
        name: "Chicken Livers and Portuguese Roll",
        description: "Chicken Livers Topped with PERi-PERi Sauce.",
        images: "../FoodImg/2.jpg",
        price: 13.99,
      }]
    },
    {
      _id: 2,
      categoryName: "Pork",
      items: [{
        _id: 3,
        name: "Pork fried rice",
        description: "Tender, Spicy and Juicy.",
        images: "../FoodImg/1.jpg",
        images: "../FoodImg/3.jpg",
        price: 12
      }]
    },
    {
      _id: 7,
      categoryName: "Curries",
      menuItems: [{
        _id: 8,
        name: "Green Coconut Curry",
        description: "Creamy green curry cooked with coconut milk, squash, kaffir lime leaves",
        images: "../FoodImg/1.jpg",
        images: "../FoodImg/4.jpg",
        price: 16
      }]
    }
  ],
  };

  addOrder = (dish) => {
    this.setState((state) => {
      const list = state.orders.push(dish);
      return list;
    });
    console.log(this.state.orders);
  };

  createCategorys = (props) => {
    return <Tab key={props.id}>{props.categoryName}</Tab>;
  };

  createItems = (props) => {
    return (
      <TabPanel key={props.id}>
        {props.items.map((item) => (
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
            {this.state.menu.map(this.createCategorys)}
          </TabList>
          {/* {this.state.menu.map(this.createItems)} */}
        </Tabs>
      </div>
    );
  }
}
