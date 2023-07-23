import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./Myorders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import LaunchIcon from '@mui/icons-material/Launch';
import MetaData from "../layout/MetaData.jsx"
import { Typography } from '@mui/material';




function Myorders() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 0.5 },
        { field: "product", headerName: "Product", minWidth: 300,flex:0.5 },
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
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                const orderId = params.row.id; // Assuming the unique identifier for the order is stored in the "id" field of the row data
                return (
                  <Link to={`/order/${orderId}`}><LaunchIcon/></Link>
                );
              }
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 250,
            flex:0.5,
        }
    ];
    const rows = [];
    orders && orders.forEach((item,index) => {
        rows.push({
            itemQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice,
            })
    });

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        };
        dispatch(myOrders());

    }, [dispatch, alert, error]);
  return (
      <Fragment>
          <MetaData title={`${user && user.name} - Orders`} />

          {
              loading ? (<Loader />) : (
                  <div className='myOrdersPage'>
                      <DataGrid
                          rows={rows}
                          columns={columns}
                          pageSize={10}
                          disableSelectionOnClick
                          className='myOrdersTable'
                          autoHeight
                      />
                      <Typography id="myOrdersHeading">{ user && user.name}'s Orders</Typography>
                  </div>
              )
}

    </Fragment>
  )
}

export default Myorders