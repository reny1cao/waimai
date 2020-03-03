import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Home } from './components/Home'
import Menu from './components/Menu'
import { OrderRecord } from './components/OrderRecord'
import { RestaurantHome } from './components/RestaurantHome'
import { RestaurantSignUp } from './components/RestaurantSignUp'
import { SignUpPage } from './components/SignUpPage';
import LogInPage from './components/LogInPage'
import AdminView from './components/AdminView'
import FeedBack from './components/FeedBack'
import UserEdit from './components/UserEdit'
import './App.css';
import UserMenu from './components/UserMenu';

class App extends React.Component {
  state = {
    ActionAvailable: "Log In",
    menu: [{
        id: 5,
        category: "Most Popular",
        menuItems: [{
          id: 6,
          name: "Cream Corn Soup with Crab Meat",
          description: "Sweet and testy",
          images: "../FoodImg/1.jpg",
          price: 15.95
        }]
      },
      {
        id: 0,
        category: "Appeteasers",
        menuItems: [{
          id: 4,
          name: "3 Chicken Wings",
          description: "Tender, Spicy and Juicy. Original or Peri-Crusted",
          images: "../FoodImg/1.jpg",
          price: 12,
        }, {
          id: 1,
          name: "Chicken Livers and Portuguese Roll",
          description: "Chicken Livers Topped with PERi-PERi Sauce.",
          images: "../FoodImg/2.jpg",
          price: 13.99,
        }]
      },
      {
        id: 2,
        category: "Pork",
        menuItems: [{
          id: 3,
          name: "Pork fried rice",
          description: "Tender, Spicy and Juicy.",
          images: "../FoodImg/1.jpg",
          price: 12
        }]
      },
      {
        id: 7,
        category: "Curries",
        menuItems: [{
          id: 8,
          name: "Green Coconut Curry",
          description: "Creamy green curry cooked with coconut milk, squash, kaffir lime leaves",
          images: "../FoodImg/1.jpg",
          price: 16
        }]
      }
    ]
  }
  editCategory = (id, newValue) => {
    console.log(id);
    this.setState({
      menu: this.state.menu.map(item => {
        if (item.id === id) {
          item.category = newValue;
        }
        return item;
      })
    })
  }

  editMenuItems = (category, keyName, newValue, id) => {
    this.setState({
      menu: this.state.menu.map(item => {
        if (item.category === category) {
          item.menuItems.forEach(menuItem => {
            if (menuItem.id === id) {
              menuItem[keyName] = newValue;
            }
          })
          console.log(item.menuItems);
        }
        return item;
      })
    })
  }
  render() {
    return (
      <Router>
        <div>
            <Route path="/loginPage" component={LogInPage} />
            <Route path="/" exact component={Home} />
            <Route path="/SignUpPage" component={SignUpPage} />
            <Route path="/Restaurant/menu" render={props => (<Menu {...props} menu={this.state.menu} editCategory={this.editCategory} editMenuItems={this.editMenuItems}/>)} />
            <Route path="/menu" render={props => (<UserMenu {...props} menu={this.state.menu} />)} />
            <Route path="/Restaurant/OrderRecord" component = {OrderRecord} />
            <Route path = "/RestaurantHome" exact component = {RestaurantHome} />
            <Route path = "/Restaurant/SignUp" component = {RestaurantSignUp} />   
            <Route path="/AdminView" component={AdminView} />
            <Route path="/FeedBack" component={FeedBack} />
            <Route path="/UserEdit" component={UserEdit} />
        </div>
      </Router>
  );
    }
}

export default App;

