import React from "react";
import { Link } from "react-router-dom";

export const RestaurantHome = () => {
  return (
    <div>
      <p>
        <Link to="/Restaurant/Menu">
          <button className="restaurant-home">Menu</button>
        </Link>
      </p>
      <p>
        <Link to="/Restaurant/OrderRecord">
          <button className="restaurant-home">Orders</button>
        </Link>
      </p>
    </div>
  );
};
