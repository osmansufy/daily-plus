
import {Tab,Row,Col,Nav,Modal,Container} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import emptyImg from '../../assets/img/empty.png'
import ButtonQuantity from '../../UI/Button/ButtonQtn';
import * as cartActions from '../../store/actions/actionCart'
import PreOrderCheckout from '../../component/PreOrder/PreOrderChckout';
import PreOngoing from '../../component/PreOrder/PreOrderOngoing';
import PreHistory from '../../component/PreOrder/PreOrderHistory';
const PreOrderInfo = () => {

    return (
<div className="custom_page preorder mb-5">
         <Container> 

       
    <Modal.Dialog className="mx-auto my-0 " contentClassName="pt-5">
    
    <Modal.Body >
     <Tab.Container id="left-tabs-example" defaultActiveKey="first">
  <Row>
  <Col >
  <Nav  className="">
        <Nav.Item>
          <Nav.Link eventKey="first">New</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="second">Ongoing</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="third">History</Nav.Link>
        </Nav.Item>
      </Nav>
  </Col>
    <Col sm={12}>
      <Tab.Content>
        <Tab.Pane eventKey="first">
       <PreOrderCheckout />
        </Tab.Pane>
        <Tab.Pane eventKey="second">
        <PreOngoing />      
        </Tab.Pane>
        <Tab.Pane eventKey="third">
      <PreHistory />
      
        </Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>
</Modal.Body>
</Modal.Dialog>
</Container>
    </div> 

      );
}
 
export default PreOrderInfo;