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
    const columns = [];
    const rows = [];

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        };
        dispatch(myOrders());

    }, [dispatch, alert, error]);
  return (
      <Fragment>
          <MetaData title={`${user.name} - Orders`} />

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
                      <Typography id="myOrdersHeading">{ user.name}'s Orders</Typography>
                  </div>
              )
}

    </Fragment>
  )
}

export default Myorders