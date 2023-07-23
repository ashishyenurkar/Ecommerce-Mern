import React from 'react'
import { Rating } from '@mui/material'
import profilePng from "../../images/Profile.png"

function ReviewCard({ review,rating }) {
  
  
  const options = {
    size: "large",
    value: rating,
    readOnly: true,
    presion:0.5,
};
  
  return (
      <div className='reviewCard'>
          <img src={profilePng} alt="User" />
          <p>{review.name}</p>
          <Rating {...options} />
          <span className='reviewCardComent'>{review.comment}</span>
    </div>
  )
}

export default ReviewCard