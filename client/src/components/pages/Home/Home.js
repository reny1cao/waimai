import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  getRestaurant,
  createRestaurant,
} from "../../../actions/RestaurantActions";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import "./Home.css";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    width: 500,
    position: "absolute",
    top: 220,
    left: "50%",
    marginLeft: -250,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  card: {
    maxWidth: 345,
  },
  sectionName: {
    marginTop:20
  },
}));

export default function Home(props) {
  // constructor(props) {
  //   super(props);
  //   this.props.history.push("/");
  // }

  // state = {
  //   search: "",
  //   filteredData: [],
  //   restaurantList: [],
  // };

  const handleInputChange = (e) => {
    console.log(e.target.value);
    this.setState({
      search: e.target.value,
    });
    this.filterArray();
    console.log(this.state.filteredData[0]);
  };

  const handleClickChange = () => {
    try {
      this.props.history.push(
        "/" + "restaurant" + "/" + this.state.filteredData[0]._id
      );
    } catch {
      console.log("error");
    }
  };

  // const filterArray = () => {
  //   if (this.state.search.length > 0) {
  //     this.state.filteredData = this.state.restaurantList.filter((l) => {
  //       return l.name.toLowerCase().includes(this.state.search);
  //     });
  //   }
  // };

  // useEffect(() => {
  //   getRestaurant(this);
  // }, [])

  // const { restaurantList } = this.state;
  const classes = useStyles();

  return (
    <div className="home">
      {/* <Search className="searchBar" placeholder="Find food or Restaurant" onSearch={this.handleInputChange} enterButton /> */}
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Find food or Restaurant"
          onChange={handleInputChange}
          inputProps={{ "aria-label": "Find food or Restaurant" }}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          onClick={handleClickChange}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <img
        id="hero-img"
        src={require("./../../../img/hero.jpg")}
        alt="hero image"
      ></img>
      <div className="flex-container">
        {/* {restaurantList.map(createRestaurant)} */}
      </div>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Typography className={classes.sectionName} variant="h4" gutterBottom>
              Popular
            </Typography>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image="./../../../img/1.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                  Village Genius Pub
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                  $0.99 Delivery Fee • 10–20 Min • $
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
