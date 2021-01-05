

const ButtonQuantity = props => {
    return ( <div  className="quantity-group">
    <button onClick={props.subClicked }  className="btn btn-minus"><i  className="fa fa-minus" /></button>
    {props.children}
    <button onClick={props.addClicked } className="btn btn-plus"><i  className="fa fa-plus" /></button>
  </div> );
}
 
export default ButtonQuantity;