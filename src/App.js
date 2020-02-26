import React from 'react';
import { Header } from './components/Header'
import { RestaurantCard } from './components/RestaurantCard'
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <div className="flex-container">
        <RestaurantCard className="card"/>
        <RestaurantCard className="card"/>
        <RestaurantCard className="card"/>
        <RestaurantCard className="card"/>
      </div>
    </div>
  );
}

export default App;
