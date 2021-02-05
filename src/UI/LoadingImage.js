import { useState } from "react";

const LoadingImage = (props) => {

    const [loaded,setLoaded]=useState(false);
  
    const showImage = () => {
      setLoaded(true);
    }
    return ( <>
         <img 
         width={props.width}
         height={props.height}
         
         src={props.emptyImg} style={ loaded ? {display: "none"} : {}} />
        <img 
        width={props.width}
        height={props.height}
        className={props.imageClass} src={props.realImage}
             onLoad={showImage} style={ loaded ? {} : {display: "none"}} />
    </>  );
}
 
export default LoadingImage;