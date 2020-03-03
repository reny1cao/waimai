import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Modal } from 'react-bootstrap'
import {Row, Col} from 'react-bootstrap/'


export class FeedBack extends Component {
    render() {
        const name = sessionStorage.getItem('first_name') + ' ' + sessionStorage.getItem('last_name')
        return (
         
          <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Please provide your rating</Modal.Title>
          </Modal.Header>
        
          <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                Your Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="Name" placeholder="Name" />
              </Col>
            </Form.Group>
          
        
         
            <fieldset>
              <Form.Group as={Row}>
                <Form.Label as="legend" column sm={2}>
                  Ratings(5 is the best 1 is the worst)
                </Form.Label>
                <Col sm={10}>
                  <Form.Check
                    type="radio"
                    label="1"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                  />
                  <Form.Check
                    type="radio"
                    label="2"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                  />
                  <Form.Check
                    type="radio"
                    label="3"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                  />
                    <Form.Check
                    type="radio"
                    label="4"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                  />
                    <Form.Check
                    type="radio"
                    label="5"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                  />
                </Col>
              </Form.Group>
            </fieldset>
        
          
           
          </Form>
          </Modal.Body>
        
          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Submit Rate</Button>
          </Modal.Footer>
        </Modal.Dialog>

          
        )
    }
}

export default FeedBack

