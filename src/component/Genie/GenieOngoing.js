import { useEffect } from "react"
import { useSelector } from "react-redux"

import axios from '../../axios'

const GenieOngoing = () => {


    const usersToken=useSelector(state=>state.auth.accessToken)
    useEffect(()=>{
     
          axios.get('order/genielist/items/',{
              headers: {
                  Authorization: `JWT ${usersToken}`,
                },
           })
           .then(response=>{
               console.log(response)
               
           })
           .catch(error=>{
               console.log(error)
           })
      },[])
    return (  

        <section >

        </section>
    );
}
 
export default GenieOngoing;