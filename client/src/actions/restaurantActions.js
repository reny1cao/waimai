
const apiEndPoint = "http://localhost:5000/restaurant"

export function register(formComp, dashboardComp) {
    const url = apiEndPoint + "/sign-up";

    const newRestaurant = formComp.state;
    const request = new Request(url, {
        method:"POST",
        body: JSON.stringify(newRestaurant),
        headers: {
            Accept:"application/json, text/plain, */*", 
            "Content-Type": "application/json"
        } 
        
        
    });

    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                dashboardComp.setState({
                    message: {
                        body: "Success: Added a restaurant.",
                        type: "success"
                    }
                });
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                dashboardComp.setState({
                    message: {
                        body: "Error: Could not add restaurant.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export function getRestaurant(id) {
    const url = apiEndPoint + "/5e841a3c56bb8007170cab0e";
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get students");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            // studentList.setState({ studentList: json.students });
            console.log(json)
        })
        .catch(error => {
            console.log(error);
        });

    }

export function editMenuItem(id, newItem) {
    const url = apiEndPoint + '/5e841a3c56bb8007170cab0e/5e841a6e56bb8007170cab0f/5e841aa156bb8007170cab10'
    const request = new Request(url, {
        method:"PATCH",
        body: JSON.stringify({
            "itemName": "Beef soup",
            "description": "no.2",
            "price": 20,
            "image": "not available"
        }),
        headers: {
            Accept:"application/json, text/plain, */*", 
            "Content-Type": "application/json"
        } 
    });

    fetch(request)
    .then(res => {
        if (res.status === 200) {
            return res.json();
        }
    })
    .then(json => {
        console.log(json)
    })
    .catch(error => {
        console.log(error);
    });
}