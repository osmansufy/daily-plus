import {Modal,Button} from 'react-bootstrap'
const SuccessModal = (props) => {
    return (   <Modal
        size="sm"
        show={props.show}
        onHide={props.hide}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
      >
            
        
        <Modal.Body>
            {props.children}
            
          
           
            </Modal.Body>
      </Modal> );
}
 
export default SuccessModal;