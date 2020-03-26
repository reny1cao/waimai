import React from 'react'
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';


import Input from './Input';

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
            color="primary"
            onClick={searchForName}
            className="search-button"
        >
        Search
        </Button>
        <Button
            color="secondary"
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