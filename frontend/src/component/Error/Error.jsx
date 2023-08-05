import { Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import "./Error.css"

function Error({message}) {
  return (
      <div className='error'><Typography component="h1">{message}</Typography>
      <Link to="/login"><Button>Go to Login</Button></Link>
      </div>
  )
}

export default Error