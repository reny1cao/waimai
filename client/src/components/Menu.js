import React, { Component } from 'react';
import ItemCard from './ItemCard';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TabCard from './TabCard'
import { editMenuItem, getRestaurant } from '../actions/restaurantActions'
import 'react-tabs/style/react-tabs.css';

class Menu extends Component {

    state = {
        // category: [
        //     {
        //         id: "",
        //         categoryName:"",
        //         items:[{
        //             id:"",
        //             itemName:"",
        //             description:"",
        //             price:0,
        //             image:""
        //         }]
        //     }
        // ]
        currentRestaurant:null
    }

    async componentDidMount() {
        getRestaurant()
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components
        }
    

    createCategorys = (props) => {
        return ( 
            <Tab key={props.id}>
                <TabCard name={props.category} id={props.id} editCategory={this.props.editCategory}/>
            </Tab>
            
        )
    }

    handleAddMenu = () => {

    }

    createItems = (props) => {
        return (
            <TabPanel key={props.id}>
                {props.menuItems.map(item => <ItemCard key={item.id} id={item.id}name={item.name} description={item.description} price={item.price} category={props.category} editMenuItems={this.props.editMenuItems}/>)}
                {/* <button className="add-menu-card">add</button> */}
            </TabPanel>
        )
    }
    
    render() {
        return (
            <div>
                {/* <Header 
                title="Mission Chinese Food"
                // userState="Log In"
                // userState1="Sign Up"
            /> */}
                <Tabs>
                    <TabList id="tabList">
                        {this.props.menu.map(this.createCategorys)}
                        {/* <button className="add-tab" onClick={this.addTab}>add</button> */}
                    </TabList>
                    {this.props.menu.map(this.createItems)}
                </Tabs>
            </div>
        )
    }
}

export default Menu;
