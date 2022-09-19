import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Select, { SingleValue } from 'react-select';
import { SetStateAction, useState } from "react";
import axios from 'axios';

const CreateProject = (props: any) => {
  const [choice, setUserChoice] = useState<SingleValue<object>>({});

  const [projectName, setProjectName] = useState('');
  const [projectState, setProjectState] = useState('');

  const stateChange = (item: any) => {
    setProjectState(item.value)
  }

  const createObject = (e: any) => {
    e.preventDefault()
    let newChoice: any = choice
    let creatObj = { "name": projectName, "state": projectState, "permit": newChoice.map((item: any) => { return item.value }) }
    let user_id = localStorage.getItem('userID')

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/project/${user_id}`, creatObj)
      .then((result: any) => {
        props.setResponseMessage("Project Created Successfully")
        props.handleClose();
        props.handleShow();

      }).catch((error) => {
        props.setResponseMessage("Error while creating project, please try again.")
      })
  }
  return (
    <>
      <Modal.Body>
        <div className="mt-2 col d-flex justify-content-center ">
          <Form onSubmit={createObject} className="form-inline my-2 my-lg-0 ml-auto">
            <Form.Group className="mb-3">
              <Form.Label>Enter Project Name:</Form.Label>
              <Form.Control type="input" onChange={((e) => {
                setProjectName(e.target.value)
              })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Select Project State:</Form.Label>
                <Select
                  name="state"
                  options={[{ value: 'Open', label: 'Open' }, { value: 'Close', label: 'Close' }, { value: 'Propose', label: 'Propose' }]}
                  className="basic-multi-select"
                  onChange={(choice: SingleValue<object>) => stateChange(choice)}
                  classNamePrefix="select"
                />
              </Form.Group>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Permission</Form.Label>
              <Select
                isMulti
                name="colors"
                options={[{ value: 'Read', label: 'Read' }, { value: 'Create', label: 'Create' }, { value: 'Update', label: 'Update' }, { value: 'Delete', label: 'Delete' }]}
                className="basic-multi-select"
                onChange={(choice: SetStateAction<object>) => setUserChoice(choice)}
                classNamePrefix="select"
              />
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="me-2" variant="primary" type="submit" onClick={createObject}>
          Submit
        </Button>
        <Button variant="secondary" onClick={props.handleShow}>
          Close
        </Button>
      </Modal.Footer>

    </>
  )
}

export default CreateProject