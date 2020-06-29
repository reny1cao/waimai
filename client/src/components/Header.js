import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import { Avatar } from "./Avatar";

import "./Header.css";

class Header extends React.Component {
  render() {
    const { title } = this.props;
    const { userState } = this.props;
    const { userState1 } = this.props;

    return (
      <div id="header">
        <h1 id="title">{title}</h1>
        <Login text={userState} />
        <SignUp text={userState1} />
        <Avatar />
      </div>
    );
  }
}

export default Header;
