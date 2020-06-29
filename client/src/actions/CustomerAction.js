export const getCustomer = (home) => {
  // the URL for the request
  const url = "http://localhost:5000/customer";

  // Since this is a GET request, simply call fetch on the URL
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        alert("Could not get customer");
      }
    })
    .then((json) => {
      // the resolved promise with the JSON body
      home.setState({ customerList: json.customerList });
    })
    .catch((error) => {
      console.log(error);
    });
};

// A function to update the student form state
export const updateCustomerForm = (formComp, field) => {
  const value = field.value;
  const name = field.name;

  formComp.setState({
    [name]: value,
  });
};

export const addCustomer = (formComp) => {
  // the URL for the request
  const url = "http://localhost:5000/customer/sign-up";

  // The data we are going to send in our request

  const customer = formComp.state;
  console.log(formComp.state);

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(customer),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  // Send the request with fetch()
  fetch(request)
    // .then(function (res) {
    //     // Handle response we get from the API.
    //     // Usually check the error codes to see what happened.
    //     if (res.status === 200) {
    //         // If student was added successfully, tell the user.
    //         dashboardComp.setState({
    //             message: {
    //                 body: "Success: Added a customer.",
    //                 type: "success"
    //             }
    //         });
    //     } else {
    //         // If server couldn't add the student, tell the user.
    //         // Here we are adding a generic message, but you could be more specific in your app.
    //         dashboardComp.setState({
    //             message: {
    //                 body: "Error: Could not add customer.",
    //                 type: "error"
    //             }
    //         });
    //     }
    // })
    .catch((error) => {
      console.log(error);
    });
};

export const getCart = (home) => {
  // the URL for the request
  const url = "http://localhost:5000/customer/:id/cart";

  // Since this is a GET request, simply call fetch on the URL
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        alert("Could not get cart");
      }
    })
    .then((json) => {
      // the resolved promise with the JSON body
      home.setState({ customerCart: json.customerCart });
    })
    .catch((error) => {
      console.log(error);
    });
};
