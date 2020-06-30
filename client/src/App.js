import React from "react";
import { Route, Switch, BrowserRouter, Link } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Menu from "./components/Menu/Menu";
import Cart from "./components/Cart";
import { OrderRecord } from "./components/OrderRecord";
import { RestaurantHome } from "./components/RestaurantHome";
import RestaurantSignUp from "./components/SignupPage/RestaurantSignUp";
import CustomerSignUp from "./components/SignupPage/CustomerSignUp";
import { SignUpPage } from "./components/SignupPage/SignUpPage";
import LogInPage from "./components/LogInPage/LogInPage";
import AdminView from "./components/AdminView/AdminView";
import FeedBack from "./components/FeedBack";
import UserEdit from "./components/UserEdit";
import "./App.css";
import UserMenu from "./components/UserMenu";
import { readCookie } from "./actions/logInActions";
import NavBar from "./components/NavBar/NavBar";

class App extends React.Component {
  constructor(props) {
    super(props);
    readCookie(this);
  }

  state = {
    currentUser: null,
    userType: null,
  };

  editCategory = (id, newValue) => {
    console.log(id);
    this.setState({
      menu: this.state.menu.map((item) => {
        if (item.id === id) {
          item.category = newValue;
        }
        return item;
      }),
    });
  };

  editMenuItems = (category, keyName, newValue, id) => {
    this.setState({
      menu: this.state.menu.map((item) => {
        if (item.category === category) {
          item.menuItems.forEach((menuItem) => {
            if (menuItem.id === id) {
              menuItem[keyName] = newValue;
            }
          });
          console.log(item.menuItems);
        }
        return item;
      }),
    });
  };

  addCustomer = (customer) => {
    this.setState((state) => {
      const list = state.Customer.push(customer);
      console.log(this.state.Customer);
      return list;
    });
  };

  addRestaurant = (restaurant) => {
    this.setState((state) => {
      const list = state.Restaurant.push(restaurant);
      console.log(this.state.Restaurant);
      return list;
    });
  };

  render() {
    const { currentUser, userType } = this.state;
    return (
      <React.Fragment>
        <BrowserRouter>
          <NavBar user={this.state.currentUser} />
          <Route
            path="/loginPage"
            render={(props) => <LogInPage {...props} app={this} />}
          />
          <Route path="/restaurant/sign-Up" component={RestaurantSignUp} />
          <Route
            path="/Restaurant/menu"
            render={(props) => (
              <Menu
                {...props}
                menu={this.state.menu}
                editCategory={this.editCategory}
                editMenuItems={this.editMenuItems}
              />
            )}
          />
          <Route
            path="/menu"
            render={(props) => <UserMenu {...props} menu={this.state.menu} />}
          />
          <Route path="/Cart" component={Cart} />
          <Route path="/Restaurant/OrderRecord" component={OrderRecord} />
          <Route path="/RestaurantHome" component={RestaurantHome} />
          <Route path="/SignUpPage" component={SignUpPage} />
          <Route path="/customer/sign-up" component={CustomerSignUp} />
          <Route path="/AdminView" component={AdminView} />
          <Route path="/FeedBack" component={FeedBack} />
          <Route path="/UserEdit" component={UserEdit} />
          <Route exact path="/" component={Home} />
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
