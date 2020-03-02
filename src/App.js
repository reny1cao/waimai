import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Home } from './components/Home'
import { Menu } from './components/Menu'
import { OrderRecord } from './components/OrderRecord'
import { RestaurantHome } from './components/RestaurantHome'
import { RestaurantSignUp } from './components/RestaurantSignUp'
import { SignUpPage } from './components/SignUpPage';
import LogInPage from './components/LogInPage'
import AdminView from './components/AdminView'
import FeedBack from './components/FeedBack'
import UserEdit from './components/UserEdit'
import './App.css';

class App extends React.Component {
  state = {
    ActionAvailable: "Log In"
  }
  
  render() {
    return (
      <Router>
        <div>
            <Route path="/loginPage" component={LogInPage} />
            <Route path="/" exact component={Home} />
            <Route path="/SignUpPage" component={SignUpPage} />
            <Route path="/Restaurant/menu" component={Menu} />
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

