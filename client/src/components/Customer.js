export class Customer {
    constructor(name, address,deliveryArea, contactNumber, username, password) {
        this.name = name;
        this.address = address;
        this.deliveryArea = deliveryArea;
        this.contactNumber = contactNumber;
        this.preference = [];
        this.username = username;
        this.password = password;
        this.order = [];
    }
}
