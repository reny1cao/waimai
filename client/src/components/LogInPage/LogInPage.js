import React from "react";
import LogInForm from "../LogInForm/LogInForm";
import SelectUser from "../SelectUser";
import {
  login,
  logInAdmin,
  logInUser,
  logInRestaurant,
  backTrack,
} from "../../actions/logInActions";
import { getRestaurant } from "../../actions/RestaurantActions";
import { getCustomer } from "./../../actions/CustomerAction";
import "./LogInPage.css";

class LogInPage extends React.Component {
  constructor(props) {
    super(props);
    this.props.history.push("/LogInPage");
  }

  state = {
    username: "",
    password: "",
    userType: "",
    errMsg: "",
    restaurant: "",
    customer: "",
    restaurantList: "",
    customerList: "",
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
    this.findId();
  };

  handleClick = (event) => {
    const target = event.target;
    const value = target.value;

    if (value === undefined) {
      this.setState({
        userType: target.innerHTML,
      });
    } else {
      this.setState({ userType: value });
    }
  };

  findId = () => {
    if (this.state.userType === "Restaurant") {
      this.state.restaurant = this.state.restaurantList.filter((l) => {
        return this.state.username === l.username;
      });
    } else if (this.state.userType === "Customer") {
      this.state.customer = this.state.customerList.filter((l) => {
        return this.state.username === l.username;
      });
    }
  };

  componentDidMount = () => {
    getCustomer(this);
    getRestaurant(this);
  };

  render() {
    const { app, history } = this.props;

    if (this.state.userType === "") {
      return (
        <div className="LogInPage">
          <SelectUser
            title="I would like to log in as:"
            handleClick={this.handleClick}
          />
        </div>
      );
    } else {
      return (
        <div className="LogInPage">
          <LogInForm
            pageTitle={this.state.userType}
            username={this.state.username}
            password={this.state.password}
            handleChange={this.handleInputChange}
            errMsg={this.state.errMsg}
            id={this.state.id}
            logIn={() => {
              login(this, app, this.state.userType);
            }}
            backTrack={() => backTrack(this)}
          />
        </div>
      );
    }
  }
}
export default LogInPage;
