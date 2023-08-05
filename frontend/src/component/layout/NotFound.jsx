import React from 'react'
import "./NotFound.css"
import { Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
      <div className='pageNotFound'>
          <Typography component={"h1"} >Page Not Found</Typography>
          <Link to="/" ><Button className='btn'>Go To Home page</Button></Link>
          
    </div>
  )
}

export default NotFound
