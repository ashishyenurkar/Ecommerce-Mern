import React, { Fragment, useEffect } from 'react'
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



function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid sans", "Chilanka"]
      }
    })
    store.dispatch(loadUser());
  }, []);
  return (
    <Fragment>
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
          
        </Routes>
        <Footer/>
      </Router>
</Fragment>
  );
}

export default App;
