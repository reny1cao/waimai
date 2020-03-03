import React from "react";
import Button from "@material-ui/core/Button";


import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import Input from './Input';
import { removeUser, editUser } from "./../actions/AdminActions";


const log = console.log;

class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
          editing: false
    };
  }

  render() {
    const { user, AdminComponent, handleChangeEdit} = this.props;
    if (this.state.editing === false){
    return (
                <TableRow className="user" key={user.name}>
                <TableCell component="th" scope="row">
                {user.name}
                </TableCell>

                <TableCell component="th" scope="row">
                {user.address}
                </TableCell>

                <TableCell component="th" scope="row">
                {user.number}
                </TableCell>

                <TableCell component="th" scope="row">
                {user.area}
                </TableCell>

                <TableCell component="th" scope="row">
                {user.preference}
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
                    removeUser.bind(this, AdminComponent, user)
                    }
                >
                    Delete User
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={ () => {
                    this.setState({editing:true})
                    }}
                >
                    Edit User
                </Button>
                </TableCell>
            </TableRow>
    )}
    else if(this.state.editing === true) {
        return(

        <TableRow className="user" key={user.name}>
    <TableCell component="th" scope="row">
        <Input
        name="name"
        value={user.name}
        onChange={handleChangeEdit}
        />
    </TableCell>

    <TableCell component="th" scope="row">
        <Input
        name="address"
        value={user.address}
        onChange={handleChangeEdit}
        />
    </TableCell>

    <TableCell component="th" scope="row">
        <Input
        name="number"
        value={user.number}
        onChange={handleChangeEdit}
        />
    </TableCell>

    <TableCell component="th" scope="row">
        <Input
        name="area"
        value={user.area}
        onChange={handleChangeEdit}
        />
    </TableCell>

    <TableCell component="th" scope="row">
        <Input
        name="preference"
        value={user.preference}
        onChange={handleChangeEdit}
        />
    </TableCell>



    <TableCell component="th" scope="row">
    <Input
        name="username"
        value={user.username}
        onChange={handleChangeEdit}
        />
    </TableCell>

    <TableCell component="th" scope="row">
    <Input
        name="password"
        value={user.password}
        onChange={handleChangeEdit}
        />
    </TableCell>


    <TableCell component="th" scope="row">
    <Button
        variant="contained"
        color="secondary"
        onClick={
        removeUser.bind(this, AdminComponent, user)
        }
    >
        Delete User
    </Button>
    <Button
        variant="contained"
        color="secondary"
        onClick={
            editUser.bind(this, AdminComponent, user, this)
            }
    >
        Save User
    </Button>
    </TableCell>
</TableRow>
        )
    }
    }
  }


export default User;