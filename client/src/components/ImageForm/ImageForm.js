import React from "react";
import { Button } from 'antd';
// Importing actions/required methods
import { addImage } from "../../actions/ImageActions";

import "./styles.css";

/* Component for the Image Form */
class ImageForm extends React.Component {

    render() {
        const { dashboard } = this.props;

        return (
            <React.Fragment>
                <form className="image-form" onSubmit={(e) => {
                    e.preventDefault();
                    addImage(e.target, dashboard);
                }}>
                    <div class="image-form__field">
                        <label>Image:</label>
                        <input name="image" type="file" />
                    </div>
                    <Button
                        type="submit"
                        className="image-form__submit-button"
                    >
                        Upload
                    </Button>
                </form>

                {/* <p className={`image-form__message--${dashboard.state.message.type}`}>
                    {dashboard.state.message.body}
                </p> */}
            </React.Fragment>
        );
    }
}

export default ImageForm;
