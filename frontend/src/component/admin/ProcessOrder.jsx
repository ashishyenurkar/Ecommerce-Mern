import React, { Fragment, useEffect, useState } from 'react'
import SideBar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import { Link, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { getOrderDetails,clearErrors, updateOrder } from '../../actions/orderAction';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { Button } from '@mui/material';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';
import "./ProcessOrder.css"

function  ProcessOrder() {
   
    const { id } = useParams();

    const dispatch = useDispatch();
    const alert = useAlert();

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error:updateError, isUpdated } = useSelector((state) => state.order);

   
    const { user } = useSelector((state) => state.user);
    console.log("user", user)
    
    const [status, setStatus] = useState("");

  
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success("Order Updated Succesfully");
            dispatch({ type: UPDATE_ORDER_RESET });
          
        }

        dispatch(getOrderDetails(id))
    }, [dispatch, alert, error,id, isUpdated, updateError]);

   
 
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("status", status);
    
    
      dispatch(updateOrder(id, myForm));
 }
 
  return (
    <Fragment>
    <MetaData title={"Process Order"}/>
    <div className='dashboard'>
      <SideBar />
      <div className="newProductContainer">
    {loading ? <Loader/> :(  <div className="confirmOrderPage">
      <div>
        <div className="confirmshippingArea">
          <Typography>Shipping Info</Typography>
          <div className='orderDetailsContainerBox'>
                          <div>
                              <p>Name:</p>
                              <span>{order && order.user && order.user.name}</span>
                          </div> 
                          <div>
                              <p>Phone:</p>
                              <span>{order && order.shippingInfo && order.shippingInfo.phoneNo}</span>
                          </div>
                          <div>
                              <p>Address</p>
                              <span>
                                  {
                                   order &&   order.shippingInfo &&
                                      `${order.shippingInfo.address}, ${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pinCode},${order.shippingInfo.country}`
                                  }
                              </span>
                          </div>
                      </div>
                              
                              <Typography>Payment</Typography>
                      <div className='orderDetailsContainer'>
                          <div>
                          <p className={order && order.paymentInfo && order.paymentInfo.status==="succeeded"?"greenColor":"redColor"}>{order &&order.paymentInfo && order.paymentInfo.status=== "succeeded" ? "PAID": "NOT PAID"}</p>
                          </div> 
                          <div>
                              <p>Ammount</p>
                              <span>{order && order.paymentInfo && order.totalPrice}</span>
                          </div>
                      </div>

                      <Typography>Order Status</Typography>
                      <div className='orderDetailsContainerBox'>
                          <div>
                              <p
                              className = {order && order.orderStatus && order.orderStatus === "Delivered" ? "greenColor":"redColor"}
                              >
                                  {order && order.orderStatus}
                              </p>
                          </div>  
                      </div>                

        </div>
        <div className="confirmCartItems">
          <Typography>Your Cart Items:</Typography>
          <div className="confirmCartItemsContainer">
            {order && order.orderItems &&
              order.orderItems.map((item) => (
                <div key={item.product}>
                  <img src={item.image} alt="Product" />
                  <Link to={`/product/${item.product}`}>
                    {item.name}
                  </Link>{" "}
                  <span>
                    {item.quantity} X ₹{item.price} ={" "}
                    <b>₹{item.price * item.quantity}</b>
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/*  */}
      <div style={{
                  display:order && order.orderStatus === "Delivered" ? 'none' : 'block'
              }}>
      <form className='updateOrderForm'
              encType='multipart/form-data'
              onSubmit={(e)=>updateOrderSubmitHandler(e)}
            >
              <h1>Process Order</h1>
  
              
              
            
                              <div >
                <AccountTreeIcon />
                <select onChange={(e) => setStatus(e.target.value)}>
                                      <option value="">Choose Category</option>
                                      {order && order.orderStatus === "processing" && (<option value="shipped">shipped</option>)}
                                      {order && order.orderStatus === "shipped" && (<option value="Delivered">Delivered</option>)}
                                      
                                      
                  
                </select>
              </div>
              
              <Button
                id='createProductBtn'
                type="submit"
                disabled={loading ? true : false || status === "" ? true : false}
  
              >
               Create Product 
              </Button>
  </form>
      </div>
    </div>)}

      </div>
</div>
  </Fragment>
  )
}



export default ProcessOrder;