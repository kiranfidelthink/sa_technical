import { Button, ModalBody, ModalFooter } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { useEffect, useState } from "react";

const DeleteModal = (props: any) => {
    const [finalData, setFinalData] = useState({ permission: [], project: { id: "", name: '', state: '', date: '' }, project_id: "", user_id: "" });

    useEffect(() => {
        if (Object.keys(props).length !== 0) {
            let realObj = props.props.data.rows.find((item: any, index: any) => {
                return index === props.props.data.index;
            })
            setFinalData(realObj)
        }
    }, [props])

    const deleteFunction = () => {

        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/project/${finalData.user_id}/${finalData.project_id}`)
            .then((result: any) => {
                props.handleClose();
                props.handleShow();
                props.setResponseMessage("Project Deleted Successfully");
                props.getData({target:[{value:localStorage.getItem("userID")}],default:true})
            }).catch((error) => {
                props.setResponseMessage("Error while deleting project");
            })
    }

    return (
        <>
            <ModalBody>
                <div className="d-flex justify-content-start">
                    <div>Are you sure you want to delete?</div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button variant="danger" onClick={deleteFunction}>
                    Yes
                </Button>

                <Button variant="secondary" onClick={props.handleShow}>
                    Close
                </Button>
            </ModalFooter>
        </>)
}

export default DeleteModal;