

const ButtonQuantity = props => {
    return ( <div  className="mt-sm-4 mb-2 quantity-group">
    <button onClick={props.subClicked }  className="btn btn-minus"><i  className="fa fa-minus" /></button>
    {props.children}
    <button onClick={props.addClicked } className="btn btn-plus"><i  className="fa fa-plus" /></button>
  </div> );
}
 
export default ButtonQuantity;