import React, { Fragment, useEffect, useState } from 'react'
import './App.css';
import Header from "./component/layout/Header/Header.js"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import webfont from "webfontloader";
import Footer from './component/layout/Footer/Footer';
import Home from "./component/Home/Home.jsx"
import ProductDetails from "./component/Product/ProductDetails.jsx";
import Products from "./component/Product/Products.jsx";
import Search from "./component/Product/Search.jsx";
import Profile from "./component/User/Profile.jsx";
import LoginSignUp from "./component/User/LoginSignUp"
import store from "./store";
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.jsx";
import { useSelector } from 'react-redux';
import UpdateProfile from "./component/User/UpdateProfile.jsx";
import UpdatePassword from "./component/User/UpdatePassword.jsx";
import ForgotPassword from "./component/User/ForgotPassword.jsx";
import ResetPassword from "./component/User/ResetPassword.jsx";
import Cart from "./component/Cart/Cart.jsx";
import Shipping from "./component/Cart/Shipping.jsx";
import ConfirmOrder from "./component/Cart/ConfirmOrder.jsx"
import Payment from "./component/Cart/Payment.jsx"
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from "./component/Cart/OrderSuccess.jsx";
import Myorders from "./component/Orders/Myorders.jsx"

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      console.log("data", data);
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Error fetching stripe API key:", error);
    }
  }
 


  useEffect(() => {
  webfont.load({
      google: {
        families: ["Roboto", "Droid sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey() 
   
  }, []);
  console.log("stripeApiKey",stripeApiKey)
  return (
    <Fragment>
       <Elements stripe={loadStripe(stripeApiKey)}>
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route  path="/products/:keyword" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path='/account' element={<Profile/>} />
          <Route exact path="/login" element={<LoginSignUp />} />
          <Route exact path="/me/update" element={<UpdateProfile />} />
          <Route exact path="/password/update" element={<UpdatePassword />} />
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route exact path="/password/reset/:token" element={<ResetPassword />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/login/shipping" element={<Shipping />} />
          <Route exact path="/order/confirm" element={<ConfirmOrder />} />
            <Route exact path="/order/confirm/process/payment" element={<Payment />} />
            <Route exact path="/success" element={< OrderSuccess />} />
            <Route exact path="/orders" element={<Myorders />} />
          
         



        </Routes>
        <Footer/>
        </Router>
        </Elements>
</Fragment>
  );
}

export default App;

