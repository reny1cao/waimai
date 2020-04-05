import React, { Component } from 'react';
import ItemCard from '../ItemCard';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Tabs, Button } from 'antd';
import { Modal, Input, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import TabCard from '../TabCard'
import { editMenuItem, getOneRestaurant, addItem } from '../../actions/restaurantActions'
import 'react-tabs/style/react-tabs.css';
import NavBar from '../NavBar/NavBar'

const { TabPane } = Tabs;
const { Dragger } = Upload;

const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };


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
                <Button id="addTab" size="large" type="dashed" onClick={this.showModal}>Add</Button>
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
    
    render() {
        const {history, app} = this.props
        const { currRestaurantMenu } = this.state;
        const { visible, confirmLoading, ModalText } = this.state;
        console.log("from Menu", this.state);
        return (
            
            <div id="home">
            <NavBar
                    history = {history}
                    app = {app}
                    />
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
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                    </p>
                </Dragger>
                </Modal>
            </React.Fragment>
            </div>
        )
    }
}

export default Menu;
