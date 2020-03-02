import React from 'react'
import Button from '@material-ui/core/Button';



class SelectUserButton extends React.Component {
    render() {
        const {onClick} = this.props;

        return (
            <Button
                value={this.props.text}
                variant="contained"
                color="primary"
                onClick={onClick}
                className="select__submit-button"
                >
                <span>{this.props.text}</span>
            </Button>
          );
    }
}

export default SelectUserButton;