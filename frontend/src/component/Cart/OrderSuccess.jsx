import React, { Fragment } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './OrderSuccess.css'

function OrderSuccess() {
  return (
      <Fragment>
          <div className='orderSuccess'>
              <CheckCircleIcon />
              <Typography>
                  Your Order has been Placed Succesfully
              </Typography>
              <Link to="/orders">View Orders</Link>
          </div>
    </Fragment>
  )
}

export default OrderSuccess