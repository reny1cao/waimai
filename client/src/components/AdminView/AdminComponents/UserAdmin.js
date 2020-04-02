import React from "react";
import Button from 'react-bootstrap/Button';


import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Input from './../../Input';
import { removeUser, editUser, setChange } from "./../../../actions/AdminActions";
import "./AdminComponents.css"

class UserAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
          editing: false
    };
  }
  

  render() {
      
    const { user, AdminComponent, handleChangeEdit} = this.props;

    const onChangeDropdown = event => {
        setChange(user, this, event.target.value);
    };
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
                    variant="btn btn-secondary"
                    className="button"
                    onClick={
                    removeUser.bind(this, AdminComponent, user)
                    }
                >
                    Delete User
                </Button>
                <Button
                    variant="btn btn-secondary"
                    className="button"
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
        <FormControl>
                <Select
                onChange={onChangeDropdown}
                value={user.area}
                >
                <MenuItem value={"UTM"}>UTM</MenuItem>
                <MenuItem value={"UTSC"}>UTSC</MenuItem>
                <MenuItem value={"UTSG"}>UTSG</MenuItem>
                <MenuItem value={"all"}>all</MenuItem>
                </Select>
            </FormControl>
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
        variant="btn btn-secondary"
        className="button"
        onClick={
        removeUser.bind(this, AdminComponent, user)
        }
    >
        Delete User
    </Button>
    <Button
        variant="btn btn-secondary"
        onClick={
            editUser.bind(this, AdminComponent, user, this)
            }
            className="button"
    >
        Save User
    </Button>
    </TableCell>
</TableRow>
        )
    }
    }
  }


export default UserAdmin;