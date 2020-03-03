import React from 'react';
import {oneRestaurantMenu} from '../restDataWithMenu';
import Header from './Header';
import { ItemCard } from './ItemCard';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function createCategorys(props) {
    return ( 
            <Tab key={props.id}>
                {props.name}
                <button className="del-tab">x</button>
            </Tab>
            
    )
}

function createItems(props) {
    return (
            <TabPanel key={props.id}>
                {props.menuItems.map(item => <ItemCard key={item.id} name={item.name} description={item.description} price={item.price}/>)}
                <button className="add-menu-card">add</button>
            </TabPanel>
            )
}

export const Menu = () => {
    return (
        <div>
            <Header 
                title="Mission Chinese Food"
                userState="Log In"
                userState1="Sign Up"
            />
            <Tabs>
                <TabList>
                    {oneRestaurantMenu.categorys.map(createCategorys)}
                    <button className="add-tab">add</button>
                </TabList>
                {oneRestaurantMenu.categorys.map(createItems)}
            </Tabs>
        </div>
    )
}

