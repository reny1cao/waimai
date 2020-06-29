import React from "react";
import { Link } from "react-router-dom";

class SignUp extends React.Component {
  render() {
    const { text } = this.props;
    return (
      <div id="signup">
        <Link to={"./../SignUpPage"}>
          <button>{text}</button>
        </Link>
      </div>
    );
  }
}
export default SignUp;
