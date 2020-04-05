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
        search:"",
        filteredData:[],
        restaurantList:[]
    }


    handleInputChange = e =>{
        console.log(e.target.value)
        this.setState({
            search: e.target.value
        })
        this.filterArray();
        console.log(this.state.filteredData[0])
    }

    handleClickChange =() => {
        try{
            this.props.history.push("/"+"restaurant"+"/"+this.state.filteredData[0]._id);
        }
        catch{
            console.log("error")
        }
        // this.props.history.push("/"+"restaurant"+"/"+this.state.filteredData[0]._id);
    }


    filterArray = () => {
        if(this.state.search.length > 0){
            // console.log(responseData[i].name);
            this.state.filteredData = this.state.restaurantList.filter(l => {
                return l.name.toLowerCase().includes(this.state.search);
            })
        }
    }

    // getRestaurant = () => {
    //     const url = "http://localhost:5000/restaurant";

    //     fetch(url)
    //         .then(res => {
    //             if (res.status === 200) {
    //                 return res.json();
    //             } else {
    //                 alert("Could not get restaurant");
    //             }
    //         })
    //         .then(data => {
    //             this.setState({
    //                     data,
    //                     filteredData
    //             });
    //         });
    // }

    componentDidMount = () => {
        getRestaurant(this)
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
                <input 
                onChange = {this.handleInputChange}
                id="searchBar" type="text" placeholder="Find food or Restaurant" />
                <button 
                onClick = {this.handleClickChange}
                type="button" id="searchButton">search</button>
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
