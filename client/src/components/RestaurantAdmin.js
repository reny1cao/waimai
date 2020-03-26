import React from "react";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

import Input from './Input';

import { removeRestaurant, editRestaurant, setChange } from "./../actions/AdminActions";


class RestaurantAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  render() {
    const { restaurant, AdminComponent, handleChangeEdit} = this.props;

    const onChangeDropdown = event => {
        setChange(restaurant, this, event.target.value);
    };

    if (this.state.editing === false){
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
              removeRestaurant.bind(this, AdminComponent, restaurant)
            }
          >
            Delete Restaurant
          </Button>
          <Button
        variant="contained"
        color="secondary"
        onClick={ () => {
            this.setState({editing:true})
            }}
    >
        Edit Restaurant
    </Button>
        </TableCell>
      </TableRow>
    );
    }
    else if (this.state.editing === true){
        return (
          <TableRow className="restaurant" key={restaurant.name}>
            <TableCell component="th" scope="row">
            <Input
        name="name"
        value={restaurant.name}
        onChange={handleChangeEdit}
        />
            </TableCell>
    
            <TableCell component="th" scope="row">
            <Input
        name="address"
        value={restaurant.address}
        onChange={handleChangeEdit}
        />
              
            </TableCell>
    
            <TableCell component="th" scope="row">
                <FormControl>
                <Select
                onChange={onChangeDropdown}
                value={restaurant.area}
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
        name="category"
        value={restaurant.category}
        onChange={handleChangeEdit}
        />
            </TableCell>
            <TableCell component="th" scope="row">
            <Input
        name="username"
        value={restaurant.username}
        onChange={handleChangeEdit}
        />
            </TableCell>
            <TableCell component="th" scope="row">
            <Input
        name="password"
        value={restaurant.password}
        onChange={handleChangeEdit}
        />
            </TableCell>
    
    
            <TableCell component="th" scope="row">
              <Button
                variant="contained"
                color="secondary"
                onClick={
                  removeRestaurant.bind(this, AdminComponent, restaurant)
                }
              >
                Delete Restaurant
              </Button>
              <Button
            variant="contained"
            color="secondary"
            onClick={
            
                editRestaurant.bind(this, AdminComponent, restaurant, this)
                }
        >
            Save Restaurant
        </Button>
            </TableCell>
          </TableRow>
        );
        }
  }
}

export default RestaurantAdmin;