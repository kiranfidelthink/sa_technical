import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Select, { SingleValue } from 'react-select';

const UpdateProject = (props: any) => {
  const [finalData, setFinalData] = useState({ project: { id: "", name: '', state: '', date: '' }, project_id: "", user_id: "" });
  const [projectName, setProjectName] = useState(finalData.project.name);
  const [projectState, setProjectState] = useState({ value: "", label: "" });

  const stateChange = (item: any) => {
    setProjectState(item)
  }

  useEffect(() => {
    if (Object.keys(props).length !== 0) {
      let realObj = props.props.data.rows.find((item: any, index: any) => {
        return index === props.props.data.index;
      })
      setFinalData(realObj);
      setProjectName(realObj.project.name);
      // setProjectState(realObj.project.state);
      setProjectState({ value: realObj.project.state, label: realObj.project.state });
    }
  }, [props])

  const updateObject = (e: any) => {
    e.preventDefault()
    let updateObj = { "name": projectName, "state": projectState.value }

    let user_id = localStorage.getItem('userID')

    axios.patch(`${process.env.REACT_APP_BACKEND_URL}/project/${user_id}/${finalData.project_id}`, updateObj)
      .then((result: any) => {
        props.handleClose();
        props.handleShow();
        props.setResponseMessage("Project Updated Successfully")
        props.getData({ target: [{ value: localStorage.getItem("userID") }], default: true })

      }).catch((error) => {
        props.setResponseMessage("Error while updating project, please try again.");
      })
  }
  return (
    <>
      <Modal.Body>
        <div className="mt-1 col d-flex justify-content-center ">
          <Form className="form-inline my-2 my-lg-0 ml-auto" onSubmit={updateObject}>
            <Form.Group className="mb-3">
              <Form.Label>Edit Project Name:</Form.Label>
              <Form.Control id="1" type="input" defaultValue={finalData.project.name} onChange={((e) => {
                setProjectName(e.target.value)
              })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Project State:</Form.Label>
              <Select
                name="state"
                options={[{ value: 'Open', label: 'Open' }, { value: 'Close', label: 'Close' }, { value: 'Propose', label: 'Propose' }]}
                className="basic-multi-select"
                // defaultValue={{ value: projectState, label: projectState }}
                value={projectState}
                onChange={(choice: SingleValue<object>) => stateChange(choice)}
                classNamePrefix="select"
              />
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="me-2" variant="primary" type="submit" onClick={updateObject}>
          Update
        </Button>
        <Button variant="secondary" onClick={props.handleShow}>
          Close
        </Button>
      </Modal.Footer>
    </>
  )
}

export default UpdateProject