import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const MessageModal = (props: any) => {
    return (
        <>
            <Modal show={props.show} onHide={props.show}>
                <Modal.Body>{props.message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MessageModal;