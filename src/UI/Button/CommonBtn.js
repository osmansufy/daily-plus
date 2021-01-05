const CommonBtn = (props) => {
    return ( <button onClick={props.clicked} disabled={false} className="btn  add-to-bag-btn">
 {props.children}
 
    </button> );
}
 
export default CommonBtn;