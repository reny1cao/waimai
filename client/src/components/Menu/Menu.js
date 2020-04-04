import React, { Component } from 'react';
import ItemCard from '../ItemCard';

// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Tabs, Button, Form } from 'antd';
import { Modal, Input } from 'antd';
import TabCard from '../TabCard'
import { getOneRestaurant, addItem, addCategory } from '../../actions/restaurantActions'
import 'react-tabs/style/react-tabs.css';
import ImageForm from '../ImageForm/ImageForm';

const { TabPane } = Tabs;


class Menu extends Component {

    constructor(props) {
        super(props);
        this.props.history.push("/RestaurantHome")
    }

    state = {
        currRestaurantMenu:[],
        name:"",
        description:"",
        price:0,
        image:"",

        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
    }

    componentDidMount() {
        getOneRestaurant(this)
    }

    handleInputChange = event => {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }
    
    showModal = () => {
        this.setState({
            visible: true,
        });
        };

    handleOk = () => {
        this.setState({
        ModalText: 'The modal will be closed after two seconds',
        confirmLoading: true,
        });
        const newItem = {
            itemName:this.state.name,
            description:this.state.description,
            price:this.state.price,
            image:""
        }
        addItem(newItem);
        this.setState({
            visible: false,
            confirmLoading: false,
        });
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };
    
    createCategorys = (category) => {
        return ( 
            // <Tab key={props.id}>
            //     <TabCard name={props.category} id={props.id} editCategory={this.props.editCategory}/>
            // </Tab>
            
            <TabPane tab={category.categoryName} key={category._id} >
                {category.items.map(this.createItems)}
                <Button size="large" type="dashed" onClick={this.showModal}>Add</Button>
            </TabPane>
            
        )
    }

    callback = (key) => {
        console.log(key);
    }

    createItems = (item) => {
        return (
            <ItemCard key={item._id} id={item._id} name={item.itemName} description={item.description} price={item.price} />
        )
    }

    onFinish = values => {
        console.log('Success:', values);
    };
    
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    
    render() {
        const { currRestaurantMenu } = this.state;
        const { visible, confirmLoading, ModalText } = this.state;
        console.log("from Menu", this.state);
        return (
            <React.Fragment>
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    {currRestaurantMenu.map(this.createCategorys)}
                </Tabs>
                <Modal
                title="Add item"
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
                centered="true"
                >
                <Input name="name" onChange={this.handleInputChange} placeholder="Name" />
                <Input name = "description" onChange={this.handleInputChange} placeholder="Descriptiion" />
                <Input name="price" onChange={this.handleInputChange}prefix="$" suffix="CND"/>
                <ImageForm />
                </Modal>

                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    >
                    <Form.Item
                        label="Category"
                        name="category"
                    >
                    <Input />
                    <Button type="primary" htmlType="submit">Add Category</Button>
                    </Form.Item>
                    </Form>
            </React.Fragment>
        )
    }
}

export default Menu;
