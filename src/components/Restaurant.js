export class Restaurant {
    constructor(name, address, username, password) {
        this.name = name;
        this.address = address;
        this.deliveryArea = {};
        this.catorgory = {};
        this.username = username;
        this.password = password;
        this.menu = {
            catorgory: [{
                "id": "0",
                "name": "Appeteasers",
                menuItems: [{
                    "id": "94298",
                    "name": "3 Chicken Wings",
                    "description": "Tender, Spicy and Juicy. Original or Peri-Crusted",
                    "images": "../FoodImg/1.jpg",
                    "price": 12,
                }]
            }]
        };
        this.addCategory = (name) => {
            this.menu.catorgory.push({
                "id": "",
                "name": "name",
                menuItems: [{
                    "id": "",
                    "name": "",
                    "description": "",
                    "images": "",
                    "price": 0,
                }]
            });
        };
        this.delCategory = (name) => {
            this.catorgory.forEach((element, i) => {
                if (element.name === name) {
                    this.catorgory.splice(i, 1);
                }
            });
        };
        this.addMenuItems = (category, dish) => {
            this.catorgory.forEach((element) => {
                if (element.name === category) {
                    element.push(dish);
                }
            });
        };
        this.delMenuItems = (category, dish) => {
            this.catorgory.forEach((element) => {
                if (element.name === category) {
                    const idx = element.menuItems.indexOf(dish);
                    element.menuItems.splice(idx, 1);
                }
            });
        };
    }
}
