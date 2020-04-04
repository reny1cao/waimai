import React, {Component} from 'react';
import Header from './Header';
import { RestaurantCard } from './RestaurantCard';
import { getRestaurant , createRestaurant } from '../actions/RestaurantActions';
import restaurantData from '../restaurantData';
import { Link } from 'react-router-dom';
import { get } from 'mongoose';
import NavBar from './NavBar/NavBar'

// function createRestaurant(props) {
//     const total = props.reviews.reduce((acc, curr) => {
//         return acc + curr.rating;
//     }, 0)
//     const rating = (parseInt(total)/props.reviews.length).toFixed(1);
// //     return <Link to={`/${props.id}`}  key={props.id}><RestaurantCard restImg={props.photograph} name={props.name} type={props.cuisine_type}  rating={rating}/> </Link>
//     return <Link to={"/menu"}  key={props.id}><RestaurantCard restImg={props.photograph} name={props.name} type={props.cuisine_type}  rating={rating}/> </Link>
// }

class Home extends Component{

    constructor(props) {
        super(props);
        this.props.history.push("/Home")
    }

    state = {
        restaurantList:[]
    }

    componentDidMount() {
        getRestaurant(this)
        console.log(this.state.restaurantList)
    }

    

    render(){
        const {history, app} = this.props
        const { restaurantList } = this.state;
        return (
            <div id="home">
                <NavBar
                    history = {history}
                    app = {app}
                    />

                <img id="hero-img" src={require("./../img/hero.jpg")} alt="hero image"></img>
                <input id="searchBar" type="text" placeholder="Find food or Restaurant"></input>
                <h2>Popular</h2>
                <div className="flex-container">
                    {restaurantList.map(createRestaurant)}
                </div>
                {/* <h2>New on Waimai</h2>
                <div className="flex-container">
                    {restaurantData.map(createRestaurant)}
                </div> */}
            </div>
        )
    }
    
}

export default Home;
