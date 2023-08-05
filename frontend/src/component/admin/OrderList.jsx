import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import SideBar from "./Sidebar";
import {useAlert} from "react-alert";
import {DELETE_ORDER_RESET } from '../../constants/orderConstants';
import {deleteOrder, getAllOrders,clearErrors } from '../../actions/orderAction';

function OrderList() {
  const alert = useAlert()
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { error, orders } = useSelector((state) => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector((state) => state.order);
   


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted succesfully");
      navigate("/admin/orders");
      dispatch({type:DELETE_ORDER_RESET});
    }

    dispatch(getAllOrders());
  }, [alert, error, dispatch, isDeleted, deleteError, navigate])
  
  const deleteOrderHandler = (id) => {
      dispatch(deleteOrder(id));
   
  }

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 0.5 },
    {
        field: "status",
        headerName: "Status",
        minWidth: 150,
        flex: 0.5,
        cellClassName: (params) => {
            const status = params.row.status;
            return (
                status === "Delivered" ? "greenColor" : "redColor"
            )
        }
    },
    {
        field: "itemQty",
        headerName: "Items Qty",
        type: "number",
        minWidth: 150,
        flex:0.3,
      },
      {
        field: "amount",
        headerName: "Amount",
        type: "number",
        minWidth: 250,
        flex:0.5,
    },  {
          field: "actions",
          headerName: "Actions",
          type: "number",
          minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
          const orderId = params.row.id
        return (
          <Fragment>
            <Link to={`/admin/order/${orderId}`} >
              <EditIcon/>
            </Link>
            <Button onClick={()=>deleteOrderHandler(orderId)}>
              <DeleteIcon/>
            </Button>
              </Fragment>
            )
          }
            }
  ]
  const rows = [];

  orders && 
  orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      })
    });
  
  

  return (
    <Fragment>
      <MetaData title={`All Orders - Admin`} />
      <div className='dashboard'>
        <SideBar />
        <div className='productListContainer'>
        <h1 id="productListHeading">All Orders</h1>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableRowSelectionOnClick
          className='productListTable'
          autoHeight
        />
</div>
      </div>

   </Fragment>
  )
}


export default OrderList