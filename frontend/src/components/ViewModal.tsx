import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from "react";

const ViewProject = (props: any) => {
  const [finalData, setFinalData] = useState({ permission: [], project: { id: "", name: '', state: '', date: '' }, project_id: "", user_id: "" });

  useEffect(() => {
    if (Object.keys(props).length !== 0) {
      let realObj = props.props.data.rows.find((item: any, index: any) => {
        return index == props.props.data.index;
      })
      setFinalData(realObj)
    }
  }, [props])

  return (
    <>
      <Modal.Body>
        <div className="mt-1 col d-flex justify-content-center ">
          <Form className="form-inline my-2 my-lg-0 ml-auto">
            <Form.Group className="mb-3">
              <Form.Label>Project ID</Form.Label>
              <Form.Control type="input" value={finalData.project_id} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>User ID</Form.Label>
              <Form.Control type="input" value={finalData.user_id} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control type="input" value={finalData.project.name} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project State</Form.Label>
              <Form.Control type="input" value={finalData.project.state} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Permissions</Form.Label>
              <Form.Control type="input" value={finalData.permission} readOnly />
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleShow}>
          Close
        </Button>
      </Modal.Footer>
    </>
  )
}

export default ViewProject