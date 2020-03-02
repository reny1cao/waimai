import React from "react";
import { uid } from "react-uid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableContainer from "@material-ui/core/TableContainer"

import RestaurantAdmin from "./RestaurantAdmin";
class RestaurantList extends React.Component {
  render() {
    const { restaurants, AdminComponent } = this.props;

    /* Our student list.  We use the state to iterate through the 
       student list and make an <li> for each one. */
    return (
        <TableContainer>
            <Table className="restaurant-list" size="small">
                <TableHead>
                        <TableRow>
                            <TableCell > Name </TableCell>
                            <TableCell > Address </TableCell>
                            <TableCell > Delivery Area </TableCell>
                            <TableCell > Category </TableCell>
                            <TableCell > Username </TableCell>
                            <TableCell > Password </TableCell>
                        </TableRow>
                    </TableHead>
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
        </TableContainer>
    );
  }
}

export default RestaurantList;