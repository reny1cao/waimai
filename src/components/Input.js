import React from "react";
import TextField from "@material-ui/core/TextField";

class Input extends React.Component {
    render() {
        const { label, value, onChange, name} = this.props;

        return (
            <div>
              <TextField
                name={name}
                label={label}
                id="margin-normal"
                defaultValue={value || ""}
                className="input"
                margin="normal"
                onChange={onChange}
                variant="outlined"
              />
            </div>
          );
    }
}

export default Input;