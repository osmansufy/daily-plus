import { Modal,Button } from "react-bootstrap";

const GenieModal = (props) => {
    return ( 

        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
         
        </Modal.Header>
        <Modal.Body>
          <h4>Your Order To Genie Is Completed</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Go to Home Page</Button>
        </Modal.Footer>
      </Modal>
     );
}
 
export default GenieModal;