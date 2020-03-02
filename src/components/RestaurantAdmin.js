import React from "react";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { removeRestaurant } from "./../actions/AdminActions";


const log = console.log;

class RestaurantAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      seconds: 0
    };
  }

//   componentDidMount() {
//     // When the component enters the DOM
//     this.userTimer = setInterval(() => this.tick(), 1000);
//   }

//   componentWillUnmount() {
//     // When the component leaves the DOM
//     clearInterval(this.userTimer);
//   }

//   // To tick off the seconds
//   tick() {;
//     this.setState({
//       seconds: this.state.seconds + 1
//     });
//   }

  render() {
    const { restaurant, AdminComponent } = this.props;

    return (
      <TableRow className="restaurant" key={restaurant.name}>
        <TableCell component="th" scope="row">
          {restaurant.name}
        </TableCell>

        <TableCell component="th" scope="row">
          {restaurant.address}
        </TableCell>

        <TableCell component="th" scope="row">
          {restaurant.area}
        </TableCell>
        <TableCell component="th" scope="row">
          {restaurant.category}
        </TableCell>
        <TableCell component="th" scope="row">
          {restaurant.username}
        </TableCell>
        <TableCell component="th" scope="row">
          {restaurant.password}
        </TableCell>


        <TableCell component="th" scope="row">
          <Button
            variant="contained"
            color="secondary"
            onClick={
              /* Remove button onClick binds the student as the parameter to the remove function. */
              removeRestaurant.bind(this, AdminComponent, restaurant)
              //() => this.removeStudent(student) // this also works
            }
          >
            remove
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default RestaurantAdmin;