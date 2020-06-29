export const readCookie = (app) => {
  const url = "/check-session";

  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      if (json && json.currentUser && json.userType) {
        app.setState({
          currentUser: json.currentUser,
          userType: json.userType,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const login = (loginComp, app, type) => {
  //temp url
  let url = "http://localhost:5000/login";

  if (type === "Restaurant") {
    url += "/restaurant";
  } else if (type === "Admin") {
    url += "/admin";
  }

  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(loginComp.state),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      if (json.currentUser !== undefined) {
        app.setState({ currentUser: json.currentUser, userType: type });
        if (type === "Restaurant") {
          console.log(loginComp);
          loginComp.props.history.push(
            "/" + type.toLowerCase() + "/" + loginComp.state.restaurant[0]._id
          );
        }
        if (type === "Customer") {
          loginComp.props.history.push("/Home");
        }
      }
    })
    .catch((error) => {
      loginComp.setState({ errMsg: "Wrong Log In Information" });
      console.log(error);
    });
};

export const backTrack = (page) => {
  page.setState({
    userType: "",
    errMsg: "",
  });
};

export const logout = (app) => {
  const url = "/logout";
  fetch(url)
    .then((res) => {
      app.setState({
        currentUser: null,
        userType: null,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
