import { useState } from "react";
import schema from "../json/schema.json";
import Table from "./Table";
import axios from 'axios';
import { Button, Dropdown, DropdownButton, Form, Spinner } from "react-bootstrap";
import CreateModal from "./Modal";
import MessageModal from "./MessageModal";
import { access_permit } from "../enum/common.enum";

const DisplayData = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState<
    Array<{
      key: string,
      value: string
    }>
  >([]);;
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isError, setIsError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const handleShow = () => setShow(!show);
  const handleClose = () => setShow2(!show2);

  const getData = async (e: any) => {
    if (e?.default !== true) {
      e.preventDefault();
    }
    if(e.target[0].value === ''){
      setIsError(`Please enter user id`)
      return;
    }
    let userId = e.target[0].value;
    localStorage.setItem("userID", userId)
    setIsLoading(true);
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/project/project_access/${userId}`)
      .then((result: any) => {
        result = result.data;
        result.forEach((item: any) => {
          if (item.permit === access_permit.CREATE) {
            setIsCreate(true)
          }
        })
        let finalArray: any = [];
        result.forEach((item: any) => {
          let finalObj = {};
          if (finalArray.find(((obj: any) => { return obj.project_id === item.project_id }))) {
            let index = finalArray.findIndex(((obj: any) => { return obj.project_id === item.project_id }));
            let Obj = finalArray[index];

            finalArray[index] = {
              ...Obj,
              "permission": [...Obj.permission, item.permit]
            }
          } else {
            let temp = [];
            temp.push(item.permit)
            finalObj = {
              "user_id": item.user_id,
              "project_id": item.project_id,
              "project_name": item.project.name,
              "project_date": item.project.date,
              "permission": temp,
              "project": item.project
            }
            finalArray.push(finalObj);
          }
          setIsLoading(false);
        })
        setIsError("")
        setFilterData(finalArray);
        setData(finalArray);
      }).catch((e) => {
        setIsCreate(false);
        setData([]);
        setFilterData([]);
        setIsError(`User with given id does not exist`)
        setIsLoading(false);
      })
  }
  const sorting = (data: any) => {
    setFilterData([...data]);
  }

  const filterSelect = (e: any) => {
    let newData: any = []
    data.forEach((project) => {
      if (project['project']['state'] === e.target.innerText) {
        newData.push(project);
      }
    });
    setFilterData(newData);
  }

  return (
    <>
      <div className="mt-5 container p-2">
        <div className="mt-5 col d-flex justify-content-center ">
          <Form onSubmit={getData} className="form-inline my-2 my-lg-0 ml-auto">
            <Form.Group className="mb-1">
              <Form.Label>Enter User ID:</Form.Label>
              <Form.Control type="input" name='userId' />
            </Form.Group>
            {isError ? <div className="text-danger">{isError}</div> : ""}
            <Button className="me-2 mt-2" variant="primary" type="submit">
              Search
            </Button>
            {isCreate ? <Button variant="primary" className="mt-2" onClick={handleShow}>
              Create
            </Button> : ""}

          </Form>
          <CreateModal isFrom={"Create"} handleShow={handleShow} show2={show2} setResponseMessage={setResponseMessage} handleClose={handleClose} show={show} />
          <MessageModal show={show2} handleClose={handleClose} message={responseMessage} />
        </div>
        {filterData.length !== 0 ? <div className="mt-5" >
          <div className="dropdown d-flex justify-content-end me-3">
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="filter" className="mb-3">
                Filter
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <DropdownButton variant="light" drop="start" id="status" title="Status">
                  <Dropdown.Item title="Propose" onClick={(e) => filterSelect(e)}>Propose</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={(e) => filterSelect(e)}>Open</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={(e) => filterSelect(e)}>Close</Dropdown.Item>
                </DropdownButton>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Table getData={getData} headers={Object.keys(schema)} sortingFnc={(filterData: any) => sorting(filterData)} rows={filterData} show2={show2} handleClose={handleClose} setResponseMessage={setResponseMessage} />
        </div> : isLoading ? <div className="row justify-content-center mt-5" ><Spinner animation="border" /></div> : ""}
      </div>
    </>
  );
};

export default DisplayData;
