import {Modal,Button} from 'react-bootstrap'


const RemoveModal = (props) => {
    return ( 
        <Modal
        size="sm"
        show={props.show}
        onHide={props.hide}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
      >
        
        
            
        
        <Modal.Body>
            {props.children}
            
            <Button onClick={props.onHome}  className="w-100 mt-3 d-flex align-items-center" variant="primary"><i className="fas fa-arrow-left"></i><span className="flex-grow-1"> No </span></Button>
            <Button  onClick={props.onDelete}  className="w-100 mt-3 d-flex align-items-center" variant="danger"><i className="fa fa-trash-o"></i><span className="flex-grow-1"> Yes </span></Button>
            
            </Modal.Body>
      </Modal>

     );
}
 
export default RemoveModal;