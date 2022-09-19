import "../css/DropDown.css";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateModal from "./Modal";
import { useEffect, useState } from "react";

const DropDown = (props: any) => {
    const [data, setData] = useState({});
    const [isFrom, setIsFrom] = useState('')
    const [updateOption, setUpdateOption] = useState(false)
    const [deleteOption, setDeleteOption] = useState(false)

    useEffect(() => {
        if (Object.keys(props).length) {
            (props.rows[props.index].permission).forEach((item: any) => {
                if (item === "Update") {
                    setUpdateOption(true)
                } else if (item === "Delete") {
                    setDeleteOption(true)
                }
            })
        }
    },)

    const openModal = (e: any) => {
        if (e.target.id === "1") {
            setData({ rows: props.rows, index: props.index })
            setIsFrom('View')
            handleShow();
        }
        else if (e.target.id === "2") {
            setData({ rows: props.rows, index: props.index })
            setIsFrom('Update')
            handleShow();
        } else if (e.target.id === "3") {
            setData({ rows: props.rows, index: props.index })
            setIsFrom('Delete')
            handleShow();
        }
    }
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(!show);
    return (<>
        <Dropdown>
            <Dropdown.Toggle
                className="dropdown-background"
                id="dropdown-basic"
            >
                ...
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item id="1" onClick={openModal}>View</Dropdown.Item>
                {updateOption ? <Dropdown.Item id="2" onClick={openModal}>Update</Dropdown.Item> : ''}
                {deleteOption ? <Dropdown.Item id="3" onClick={openModal}>Delete</Dropdown.Item> : ''}
            </Dropdown.Menu>
        </Dropdown>
        <CreateModal getData={props.getData} isFrom={isFrom} handleShow={handleShow} data={data} show={show} show2={props.show2} handleClose={props.handleClose} setResponseMessage={props.setResponseMessage}/>
    </>)

}

export default DropDown;