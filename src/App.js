import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Home } from './components/Home'
import { Menu } from './components/Menu'
import './App.css';

function App() {
  return (
      <div>
      <Router>
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/menu" component={Menu} />
      </Switch>
      </Router>
          
      </div>
  );
}

export default App;
