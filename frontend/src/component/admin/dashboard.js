import React from 'react'
import Sidebar from "./Sidebar.jsx";

function dashboard() {
  return (
      <div className='dashboard'>
          <Sidebar />
          <div dashboardContainer></div>
    </div>
  )
}

export default dashboard