import React from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from './components/Home'
import Menu from './components/Menu'
import Cart from './components/Cart'
import { OrderRecord } from './components/OrderRecord'
import { RestaurantHome } from './components/RestaurantHome'
import RestaurantSignUp from './components/SignupPage/RestaurantSignUp'
import CustomerSignUp from './components/SignupPage/CustomerSignUp'
import { SignUpPage } from './components/SignupPage/SignUpPage';
import LogInPage from './components/LogInPage/LogInPage'
import AdminView from './components/AdminView/AdminView'
import FeedBack from './components/FeedBack'
import UserEdit from './components/UserEdit'
import './App.css';
import UserMenu from './components/UserMenu';
import {readCookie} from "./actions/logInActions";
import NavBar from './components/NavBar/NavBar';

class App extends React.Component {
  constructor(props) {
    super(props);
    readCookie(this);
  }

  state = {
    currentUser: null,
    userType: null
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

  addCustomer = (customer) => {
    this.setState(state => {
      const list = state.Customer.push(customer)
      console.log(this.state.Customer)
      return list
    })
  }

  addRestaurant = (restaurant) => {
    this.setState(state => {
      const list = state.Restaurant.push(restaurant)
      console.log(this.state.Restaurant)
      return list
    })
  }

  render() {
    const { currentUser, userType } = this.state;

    return (
      <BrowserRouter>
      {/* <NavBar app={this}/> */}
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/RestaurantHome" exact component={Menu} />

          <Route path={["/Home", "/LogInPage"]}
           render = {({history}) => (
             <div className="app">
               {userType !== "Admin" ? <LogInPage history={history} app={this} /> : 
               <Home history={history} app={this} />}
              }
        </div>)} />
        <Route path={["/Cart"]}
           render = {({history}) => (
             <div className="app">
               {!currentUser ? <LogInPage history={history} app={this} /> : 
               <Cart history={history} app={this} />}
              }
        </div>)} />
        <Route path={["/Restaurant/OrderRecord"]}
           render = {({history}) => (
             <div className="app">
               {!currentUser ? <LogInPage history={history} app={this} /> : 
               <OrderRecord history={history} app={this} />}
              }
        </div>)} />
        <Route path={["/RestaurantHome"]}
           render = {({history}) => (
             <div className="app">
               {!currentUser ? <LogInPage history={history} app={this} /> : 
               <RestaurantHome history={history} app={this} />}
              }
        </div>)} />
        <Route path={["/menu"]}
           render = {({history}) => (
             <div className="app">
               {!currentUser ? <LogInPage history={history} app={this} /> : 
               <UserMenu history={history} app={this} />}
              }
        </div>)} />
        <Route path={["UserEdit"]}
           render = {({history}) => (
             <div className="app">
               {!currentUser ? <LogInPage history={history} app={this} /> : 
               <UserEdit history={history} app={this} />}
              }
        </div>)} />
        <Route path={["/AdminView"]}
           render = {({history}) => (
             <div className="app">
               {!currentUser ? <LogInPage history={history} app={this} /> : 
               <AdminView history={history} app={this} />}
              }
        </div>)} />
        <Route path={["/FeedBack"]}
           render = {({history}) => (
             <div className="app">
               {!currentUser ? <LogInPage history={history} app={this} /> : 
               <FeedBack history={history} app={this} />}
              }
        </div>)} />
        <Route path="/restaurant/sign-Up" component = {RestaurantSignUp} />
        <Route path = "/customer/sign-up" component = {CustomerSignUp} /> 
        <Route path = "/SignUpPage" component = {SignUpPage} /> 
        <Route render={() => <div> 404 Not Found</div>} />
        </Switch>
      </BrowserRouter>
    )

  //   return (
  //     <React.Fragment>
  //         <Router>
  //         <NavBar user={this.state.currentUser}/>
            
  //               <Route path="/loginPage" render={props => (<LogInPage {...props} app={this}/>)} />
  //               <Route path="/" exact component={Home} />
  //               {/* <Route path="/Restaurant/SignUp" render={props => (<RestaurantSignUp {...props} restaurant={this.state.Restaurant} addRestaurant={this.addRestaurant} />)} /> */}
  //               <Route path="/restaurant/sign-Up" component = {RestaurantSignUp} />
  //               <Route path="/Restaurant/menu" render={props => (<Menu {...props} menu={this.state.menu} editCategory={this.editCategory} editMenuItems={this.editMenuItems}/>)} />
  //               <Route path="/menu" render={props => (<UserMenu {...props} menu={this.state.menu} />)} />
  //               <Route path="/Cart" component={Cart} />
  //               <Route path="/Restaurant/OrderRecord" component = {OrderRecord} />
  //               <Route path = "/RestaurantHome" exact component = {RestaurantHome} />
  //               <Route path = "/SignUpPage" component = {SignUpPage} />    
  //               {/* <Route path = "/Customer/SignUp" render={props => (<CustomerSignUp {...props} customer={this.state.Customer} addCustomer={this.addCustomer} />)} />    */}
  //               <Route path = "/customer/sign-up" component = {CustomerSignUp} />   
  //               <Route path="/AdminView" component={AdminView} />
  //               <Route path="/FeedBack" component={FeedBack} />
  //               <Route path="/UserEdit" component={UserEdit} />
           
  //       </Router>
  //     </React.Fragment>
  // );
    }
}

export default App;

