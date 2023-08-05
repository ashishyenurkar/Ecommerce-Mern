import React, { Fragment, useEffect } from 'react';
import "./orderDetails.css"
import { getOrderDetails,clearErrors } from '../../actions/orderAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link, useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { Typography } from '@mui/material';

function OrderDetails() {
    const { id } = useParams();
    const { order, error, loading } = useSelector((state) => state.orderDetails);

    const dispatch = useDispatch();
    const alert = useAlert();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getOrderDetails(id))
    }, [dispatch, alert, error,id]);

  return (
      <Fragment>
          {loading ? <Loader /> : (<Fragment>
              <MetaData title="Order Details" />
              <div className='orderDetailsPage'>
                  <div className='orderDetailsContainer'>
                      <Typography component={"h1"}>
                          Order #{order && order._id} 
                      </Typography>
                      <Typography>Shipping Info</Typography>
                      <div className='orderDetailsContainerBox'>
                          <div>
                              <p>Name:</p>
                              <span>{order && order.user.name}</span>
                          </div> 
                          <div>
                              <p>Phone:</p>
                              <span>{order && order.shippingInfo.phoneNo}</span>
                          </div>
                          <div>
                              <p>Address</p>
                              <span>
                                  {
                                      order &&
                                      `${order.shippingInfo.address}, ${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pinCode},${order.shippingInfo.country}`
                                  }
                              </span>
                          </div>
                      </div>
                      <Typography>Payment</Typography>
                      <div className='orderDetailsContainer'>
                          <div>
                          <p className={order && order.paymentInfo.status==="succeeded"?"greenColor":"redColor"}>{order && order.paymentInfo.status=== "succeeded" ? "PAID": "NOT PAID"}</p>
                          </div> 
                          <div>
                              <p>Ammount</p>
                              <span>{ order && order.totalPrice}</span>
                          </div>
                      </div>

                      <Typography>Order Status</Typography>
                      <div className='orderDetailsContainerBox'>
                          <div>
                              <p
                              className = {order && order.orderStatus === "Delivered" ? "greenColor":"redColor"}
                              >
                                  {order && order.orderStatus}
                              </p>
                          </div>  
                      </div>

                  </div>
                  <div className='orderDetailsCartItems'>
                      <Typography>Order Items: </Typography>
                      <div className='orderDetailsCartItemsContainer'>{order && order.orderItems.map((item) => (
                          <div key={item.product}>
                              <img src={item.image} alt="product" />
                              <Link to={`/product/${item.product}`}>item.name</Link>
                              <span>{item.quantity} X {item.price} = <b>{ item.price * item.quantity}</b> </span>
                          </div>
                      ))}</div>
</div>

              </div>
          </Fragment>)}
    </Fragment>
  )
}

export default OrderDetails