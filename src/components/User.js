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

  render() {
    const { user, AdminComponent } = this.props;

    return (
                <TableRow className="user" key={user.name}>
                <TableCell component="th" scope="row">
                {user.name}
                </TableCell>

                <TableCell component="th" scope="row">
                {user.username}
                </TableCell>

                <TableCell component="th" scope="row">
                {user.password}
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
                    Delete User
                </Button>
                </TableCell>
            </TableRow>
    );
  }
}

export default User;