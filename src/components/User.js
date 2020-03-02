import React from "react";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { removeUser } from "./../actions/AdminActions";


const log = console.log;

class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      seconds: 0
    };
  }

  componentDidMount() {
    // When the component enters the DOM
    this.userTimer = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    // When the component leaves the DOM
    clearInterval(this.userTimer);
  }

  // To tick off the seconds
  tick() {;
    this.setState({
      seconds: this.state.seconds + 1
    });
  }

  render() {
    const { user, AdminComponent } = this.props;

    return (
      <TableRow className="user" key={user.name}>
        <TableCell component="th" scope="row">
          {user.username}
        </TableCell>

        <TableCell component="th" scope="row">
          {user.password}
        </TableCell>

        {/* Show how long the student has been waiting for */}
        <TableCell component="th" scope="row">
          Created {Math.floor(this.state.seconds / 60)} minutes{" "}
          {this.state.seconds % 60} seconds ago.
        </TableCell>

        <TableCell component="th" scope="row">
          <Button
            variant="contained"
            color="secondary"
            onClick={
              /* Remove button onClick binds the student as the parameter to the remove function. */
              removeUser.bind(this, AdminComponent, user)
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

export default User;