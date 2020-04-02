import React from 'react'
import Grid from "@material-ui/core/Grid";
import Button from 'react-bootstrap/Button';


import Input from './../../Input';
import "./NameSearchBar.css";

class NameSearchBar extends React.Component {
    render() {
      const {
        searchName,
        handleChange,
        searchForName,
        resetState
      } = this.props;
  
      return (
        <Grid className="search-form__container" container spacing={1}>
        
        <Input
        name="name"
        value={searchName}
        onChange={handleChange}
        label="Search by name:"
        />
        <Button
            variant="outlined-secondary"
            onClick={searchForName}
            className="search-button"
        >
        Search
        </Button>
        <Button
            variant="outlined-secondary"
            onClick={resetState}
            className="back-button"
        >
        Back
        </Button>
        </Grid>
      )
    }
}

export default NameSearchBar;