import React from "react";
import { uid } from "react-uid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import RestaurantAdmin from "./RestaurantAdmin";
class RestaurantList extends React.Component {
  render() {
    const { restaurants, AdminComponent } = this.props;

    /* Our student list.  We use the state to iterate through the 
       student list and make an <li> for each one. */
    return (
      <Table className="restaurant-list">
        <TableBody>
          {restaurants.map(restaurant => (
            <RestaurantAdmin
              key={uid(
                restaurant
              )} /* unique id required to help React render more efficiently when we modify the students list. */
              restaurant={restaurant}
              AdminComponent={AdminComponent}
            />
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default RestaurantList;