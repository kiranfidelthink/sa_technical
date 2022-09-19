import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal';
import CreateProject from './CreateProject';
import ViewProject from './ViewModal';
import UpdateProject from './UpdateProject';
import DeleteModal from './DeleteModal';

const CreateModal = (props: any) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>{props.isFrom} Project</Modal.Title>
        </Modal.Header>
        {props.isFrom === 'View' ? <ViewProject props={props} handleShow={props.handleShow} /> : props.isFrom === 'Update' ? <UpdateProject getData={props.getData} props={props} handleShow={props.handleShow} show2={props.show2} handleClose={props.handleClose} setResponseMessage={props.setResponseMessage} /> : props.isFrom === 'Delete' ? <DeleteModal getData={props.getData} props={props} handleShow={props.handleShow} show2={props.show2} handleClose={props.handleClose} setResponseMessage={props.setResponseMessage} /> : <CreateProject show2={props.show2} handleClose={props.handleClose} setResponseMessage={props.setResponseMessage} handleShow={props.handleShow} />}
      </Modal>
    </>
  );
}

export default CreateModal;