import React from "react";
import TextField from "@material-ui/core/TextField";

class Input extends React.Component {
  render() {
    const { label, value, onChange, name } = this.props;

    return (
      <div>
        <TextField
          id="standard-basic"
          name={name}
          label={label}
          defaultValue={value || ""}
          className="input"
          margin="normal"
          onChange={onChange}
        />
      </div>
    );
  }
}

export default Input;
