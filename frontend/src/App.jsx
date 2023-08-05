import React, { Fragment, useEffect, useState } from 'react'
import './App.css';
import Header from "./component/layout/Header/Header.js"
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
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
import OrderDetails from "./component/Orders/OrderDetails.jsx"
import Dashboard from "./component/Admin/Dashboard"
import ProductList from "./component/Admin/ProductList.jsx"
import Error from './component/Error/Error';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReviews from './component/Admin/ProductReviews';
import Contact from "./component/layout/Contact/Contact"
import About from './component/layout/About/About';
import NotFound from './component/layout/NotFound';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      console.log("data", data);
      const stripeApiKey = data.stripeApiKey
      setStripeApiKey(stripeApiKey );
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

  window.addEventListener("contextmenu", (e) => e.preventDefault());
 
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
            <Route exact path="/order/confirm/process/payment" element={<Payment />} />
         
          
            <Route exact path="/success" element={< OrderSuccess />} />
            <Route exact path="/orders" element={<Myorders />} />

            <Route exact path="/order/confirm" element={<ConfirmOrder />} />
            <Route exact path="/order/:id" element={<OrderDetails />} />
            {user && user.role === "admin" ? <Route exact path="/admin/dashboard" element={<Dashboard />} /> : (<Route exact path="/admin" element={<Error message={"you are not authorize to login this page This page is only for Admin User."} />} />)}

            {user && user.role === "admin" ? <Route exact path="/admin/products" element={<ProductList />} /> : (<Route exact path="/admin" element={<Error message={"you are not authorize to login this page This page is only for Admin User."} />} />)}
            
            {user && user.role === "admin" ? <Route exact path="/admin/product" element={<NewProduct />} /> : (<Route exact path="/admin" element={<Error message={"you are not authorize to login this page This page is only for Admin User."} />} />)}

            {user && user.role === "admin" ? <Route exact path="/admin/product/:id" element={<UpdateProduct />} /> : (<Route exact path="/admin" element={<Error message={"you are not authorize to View this page This page this is only for Admin User."} />} />)}

            {user && user.role === "admin" ? <Route exact path="/admin/orders" element={<OrderList />} /> : (<Route exact path="/admin" element={<Error message={"you not authorize to View this page This page this is only for Admin User."} />} />)}

            {user && user.role === "admin" ? <Route exact path="/admin/order/:id" element={<ProcessOrder />} /> : (<Route exact path="/admin" element={<Error message={"you not authorize to View this page This page this is only for Admin User."} />} />)}

            {user && user.role === "admin" ? <Route exact path="/admin/users" element={<UsersList/>} /> : (<Route exact path="/admin" element={<Error message={"you not authorize to View this page This page this is only for Admin User."} />} />)}
            
            {user && user.role === "admin" ? <Route exact path="/admin/user/:id" element={<UpdateUser/>} /> : (<Route exact path="/admin" element={<Error message={"you not authorize to View this page This page this is only for Admin User."} />} />)}
          
            {user && user.role === "admin" ? <Route exact path="/admin/reviews" element={<ProductReviews/>} /> : (<Route exact path="/admin" element={<Error message={"you not authorize to View this page This page this is only for Admin User."} />} />)}
          
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/*" element={<NotFound />} />





        </Routes>
        <Footer/>
        </Router>
        </Elements>
</Fragment>
  );
}

export default App;

