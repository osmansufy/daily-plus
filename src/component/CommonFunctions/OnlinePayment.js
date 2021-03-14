import axios from '../../axios'


const OnLinePayment=(token,amount,order,preorder)=>{
 
    axios.post('billing/ssl/payment/order/create/',
    {
        amount: amount,
        preorder: preorder,
        order:order
          }, {
            headers:{
              Authorization: `JWT ${token}`,
            }
          }
)
.then(res=>{
    window.location.replace(res.data.GatewayPageURL)
    console.log(res);
    console.log(amount,preorder,order);
})
.catch(err=>{
    console.log(err)
})
}
export default OnLinePayment