import React from 'react';
import { Header } from './components/Header';
import { RestaurantCard } from './components/RestaurantCard';
import restaurantData from './restaurantData';
import './App.css';

function createRestaurant(props) {
  const total = props.reviews.reduce((acc, curr) => {
    return acc + curr.rating;
  }, 0)
  const rating = (parseInt(total)/props.reviews.length).toFixed(1);
  return <RestaurantCard key={props.id} restImg={props.photograph} name={props.name} type={props.cuisine_type}  rating={rating}/>
}

function App() {
  return (
    <div>
      <Header />
      <h2>Popular</h2>
      <div className="flex-container">
        {restaurantData.map(createRestaurant)}
      </div>
      <h2>New on Waimai</h2>
      <div className="flex-container">
        {restaurantData.map(createRestaurant)}
      </div>
    </div>
  );
}

export default App;
