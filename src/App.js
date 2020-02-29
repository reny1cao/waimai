import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Home } from './components/Home'
import { Menu } from './components/Menu'
import './App.css';

function App() {
  return (
    <Router>
      <div>
          <Route path="/" exact component={Home} />
          <Route path="/menu" component={Menu} />
      </div>
    </Router>
  );
}

export default App;
