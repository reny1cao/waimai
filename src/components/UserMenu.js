import React, { Component } from 'react'
import Header from './Header';
import UserItemCard from './UserItemCard';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Restaurant from './Restaurant'
import 'react-tabs/style/react-tabs.css';


export default class UserMenu extends Component {
    state = {
        orders: []
    }
    
    addOrder = (dish) => {
        this.setState(state => {
            const list = state.orders.push(dish);
            return list;
        });
        console.log(this.state.orders)
    }
    
    createCategorys = (props) => {
        return ( 
            <Tab key={props.id}>
                {props.category}
            </Tab>
            
        )
    }

    createItems = (props) => {
        return (
            <TabPanel key={props.id}>
                {props.menuItems.map(item => <UserItemCard key={item.id} id={item.id} name={item.name} description={item.description} price={item.price} category={props.category} image={item.images} addOrder={this.addOrder}/>)}
                {/* <button className="add-menu-card">add</button> */}
            </TabPanel>
        )
    }
    
    render() {
        return (
            <div>
                <Header 
                    title="WAIMAI"
                    userState="Log In"
                    userState1="Sign Up"
                />
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
