import React from 'react'
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';


import Input from './Input';

class NameSearchBar extends React.Component {
    render() {
      const {
        name,
        handleChange,
        searchName
      } = this.props;
  
      return (
        <Grid className="search-form__container" container spacing={1}>
        
        <Input
        name="name"
        value={name}
        onChange={handleChange}
        label="Search by name:"
        />
        <Button
            variant="contained"
            color="primary"
            onClick={searchName}
            className="search-button"
        >
        Search
        </Button>
        </Grid>
      )
    }
}

export default NameSearchBar;