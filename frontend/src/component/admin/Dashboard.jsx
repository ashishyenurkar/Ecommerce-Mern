import React, { Fragment, useEffect, useState } from 'react'
import "./Dashboard.css"
import Sidebar from "./Sidebar";
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Doughnut, Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import {CategoryScale, LinearScale, PointElement, LineElement, ArcElement } from "chart.js";
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from '../../actions/productActions';
import { getAllOrders } from '../../actions/orderAction';
import { getAllUsers } from '../../actions/userAction';
import Loader from '../layout/Loader/Loader';



Chart.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement,);

function Dashboard() {
  const dispatch = useDispatch()
  const { products,loading } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  
  
const [outOfStock,setoutOfStock] = useState(0)


  useEffect(() => {
    products && products.forEach((item) => {
      if (item.stock === 0) {
        setoutOfStock(outOfStock + 1);
      }
    });
  }, [products, outOfStock]);
 
 
  useEffect(() => {
    dispatch(getAllOrders())
    dispatch(getAdminProducts());
    dispatch(getAllUsers())
  },[dispatch])
  let totalAmmount = 0;
  orders && orders.forEach((item) => {
    totalAmmount += item.totalPrice;
  }
)
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0,totalAmmount],
       
      },
    ],
  };
  const lineOptions = {
    scales: {
      x: {
        type: 'category',
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data:[outOfStock, products && products.length - outOfStock],
      },
    ]
  }
  const doughnutOptions = {
    plugins: {
      legend: {
        display: true, // Set to true to show labels
        position: "bottom", // Adjust the position of the legend if needed
      },
    },
  };

 

  

  return (<Fragment>{loading ? <Loader/> : ( <div className='dashboard'>
  <Sidebar />
<div className="dashboardContainer">
<Typography component={`h1`}>Dashboard</Typography>
<div className='dashboardSummary'>

  <div>
    <p>
      Totol Amount <br/> Rs {totalAmmount}
    </p>
    </div>
    <div className='dashboardSummaryBox2'>
      <Link to={"/admin/products"}>
        <p>Product</p>
      <p>{products && products.length }</p>
      </Link>
      <Link to={'/admin/orders'}>
        <p>Orders</p>
      <p>{orders && orders.length }</p>
      </Link>
      <Link to="/admin/users">
        <p>Users</p>
      <p>{users && users.length }</p>
      </Link>
</div>
</div>

<div className='lineChart'>
  <Line   data={lineState} options={lineOptions} />
</div>
<div className='doughnutChart'>
 
  <Doughnut data={doughnutState} options={doughnutOptions}/>
</div>

</div>
</div>)}</Fragment>
     
  )
}

export default Dashboard