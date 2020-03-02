import React from 'react';
import oneRestaurantMenu from '../restDataWithMenu';
import Header from './Header';
import { ItemCard } from './ItemCard';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function createCategorys(props) {
    return ( 
            <Tab key={props.id}>{props.name}</Tab>
    )
}

function createItems(props) {
    return (
            <TabPanel key={props.id}>
                {props.menuItems.map(item => <ItemCard key={item.id} name={item.name} description={item.description} price={item.price}/>)}
            </TabPanel>
            )
}

export const Menu = () => {
    return (
        <div>
            <Header 
                title="WAIMAI"
                userState="Log In"
            />
            <Tabs>
                <TabList>
                    {oneRestaurantMenu.categorys.map(createCategorys)}
                </TabList>
                {oneRestaurantMenu.categorys.map(createItems)}
            </Tabs>
        </div>
    )
}

