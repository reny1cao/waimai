import React, { Component } from "react";
import ItemCard from "../ItemCard";
import { Tabs, Button } from "antd";
import { Modal, Input } from "antd";
import {
  getOneRestaurant,
  addItem,
  addCategory,
  removeCategory,
} from "../../actions/RestaurantActions";
import "react-tabs/style/react-tabs.css";
import NavBar from "../NavBar/NavBar";
import ImageForm from "../ImageForm/ImageForm";

import "./Menu.css";

const { TabPane } = Tabs;

class Menu extends Component {
  constructor(props) {
    super(props);
    this.props.history.push("/RestaurantHome");
  }

  state = {
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
      category: "Curries",
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
    name: "",
    description: "",
    price: 0,
    image: "",

    ModalText: "Content of the modal",
    visible: false,
    addCateVisible: false,
    confirmLoading: false,

    category: "",
  };

  // componentDidMount() {
  //   getOneRestaurant(this);
  // }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: "The modal will be closed after two seconds",
      confirmLoading: true,
    });
    const newItem = {
      itemName: this.state.name,
      description: this.state.description,
      price: this.state.price,
      image: "",
    };
    addItem(newItem);
    this.setState({
      visible: false,
      confirmLoading: false,
    });
    window.location.reload(false);
  };

  showCateModel = () => {
    this.setState({
      addCateVisible: true,
    });
  };

  handleAddCate = () => {
    this.setState({
      ModalText: "The modal will be closed after two seconds",
      confirmLoading: true,
    });
    addCategory(this.state.category);
    this.setState({
      addCateVisible: false,
      confirmLoading: false,
    });
    window.location.reload(false);
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false,
    });
  };

  handleAddCateCancel = () => {
    this.setState({
      addCateVisible: false,
    });
  };

  handleEdit = (target, action) => {
    if (action === "remove") {
      removeCategory(target);
      window.location.reload(false);
    } else {
      this.showCateModel();
    }
  };
  createCategorys = (category) => {
    console.log(category, "from create");
    return (
      <TabPane tab={category.categoryName} key={category._id}>
        {category.items.map(this.createItems)}
        <Button size="large" type="dashed" onClick={this.showModal}>
          Add
        </Button>
      </TabPane>
    );
  };

  callback = (key) => {
    console.log(key);
  };

  createItems = (item) => {
    return (
      <ItemCard
        key={item._id}
        id={item._id}
        name={item.itemName}
        description={item.description}
        price={item.price}
      />
    );
  };

  render() {
    const { history, app } = this.props;
    const { menu } = this.state;
    const { visible, confirmLoading, addCateVisible } = this.state;
    console.log("from Menu", menu);
    return (
      <div id="home">
        <NavBar history={history} app={app} />
        <React.Fragment>
          <Tabs
            defaultActiveKey="1"
            onChange={this.callback}
            type="editable-card"
            onEdit={(target, action) => this.handleEdit(target, action)}
          >
            {menu.map(this.createCategorys)}
          </Tabs>
          <Modal
            title="Add item"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
            centered="true"
          >
            <Input
              name="name"
              onChange={this.handleInputChange}
              placeholder="Name"
            />
            <Input
              name="description"
              onChange={this.handleInputChange}
              placeholder="Descriptiion"
            />
            <Input
              name="price"
              onChange={this.handleInputChange}
              prefix="$"
              suffix="CND"
            />
            <ImageForm />
          </Modal>

          <Modal
            title="Add category"
            visible={addCateVisible}
            onOk={this.handleAddCate}
            confirmLoading={confirmLoading}
            onCancel={this.handleAddCateCancel}
            centered="true"
          >
            <Input
              name="category"
              onChange={this.handleInputChange}
              placeholder="Name"
            />
          </Modal>
        </React.Fragment>
      </div>
    );
  }
}

export default Menu;
