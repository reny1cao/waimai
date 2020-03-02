import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Row, Col} from 'react-bootstrap/'

export class UserEdit extends Component {
    render() {
        const name = sessionStorage.getItem('first_name') + ' ' + sessionStorage.getItem('last_name')
        return (
         
          <Form>
              <a href="www.google.ca">
                <img className="img-fluid" border="0" alt="W3Schools" src="../img/5.jpg" />
              </a>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                Change Your Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="Name" placeholder="Name" />
              </Col>
            </Form.Group>
            
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                Change Your Country
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="Country" placeholder="Country" />
              </Col>
            </Form.Group>

            
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                Change Your Email
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="Email" placeholder="Email" />
              </Col>
            </Form.Group>
          
        
            <fieldset>
              <Form.Group as={Row}>
                <Form.Label as="legend" column sm={2}>
                 Your preferences for type of food
                </Form.Label>
                <Col sm={10}>
                  <Form.Check
                    type="radio"
                    label="Chinese"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                  />
                  <Form.Check
                    type="radio"
                    label="French"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                  />
                  <Form.Check
                    type="radio"
                    label="Japanese"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                  />
                    <Form.Check
                    type="radio"
                    label="Germany"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                  />
                    <Form.Check
                    type="radio"
                    label="Turkish"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                  />
                </Col>
              </Form.Group>
            </fieldset>
          
          <Button variant="primary">Submit change</Button> 
          </Form>
        
        )
    }
}

export default UserEdit

