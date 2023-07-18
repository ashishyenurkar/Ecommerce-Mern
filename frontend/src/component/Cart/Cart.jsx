import React, { Fragment } from 'react';
import "./Cart.css"
import CartItemCart from "./CartItemCard.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from "react-alert";
import { additemsToCart,removeItemsFromCart} from '../../actions/cartAction';
import { Link, useNavigate } from 'react-router-dom';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Typography } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import MetaData from '../layout/MetaData';

function Cart() {
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        if (stock <= quantity) return alert.error(`Only ${quantity} products remaining in stock.`);
        const newQty = quantity + 1;

        dispatch(additemsToCart(id, newQty));
    }

    const decreaseQuantity = (id, quantity, stock) => {
        if (1 >= quantity) return alert.error(`product count must be a 1 in cart`);
        const newQty = quantity - 1;

        dispatch(additemsToCart(id, newQty));
    }

    const deleteCartItems =(id) => {
    dispatch(removeItemsFromCart(id))
    }
    const checkoutHandler = () => {
        navigate("/login?redirect=shipping");
    }
  
    return (
        <Fragment><MetaData title={"cart"}/>{cartItems.length === 0 ? (<div className='emptyCart'>
            <RemoveShoppingCartIcon/>
            
            <Typography>No Product in Your Cart</Typography>
            <Link to="/products">View Products</Link>
      </div>):(<Fragment>
        <div className='cartPage'>
            <div className='cartHeader'>
                <p>Product</p>
                <p>Quentity</p>
                <p>SubTotal</p>
            </div>

            {/* Render all the items in the cart */}
            {cartItems && cartItems.map((item) => (
                 <div  key={item.product} className='cartContainer'>
                    <CartItemCart item={item} deleteCartItems={deleteCartItems} />
                 <div className='cartInput'>
                        <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                     <input type="number" value={item.quantity} readOnly />
                     <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
                 </div>
                 <p className='cartSubtotal'><CurrencyRupeeIcon />{ `${item.price * item.quantity}`}</p>
             </div>
            ))}

            <div className='cartGrossProfit'>
                <div></div>
                <div className='cartGrossProfitBox'>
                    <p>Gross Total</p>
                            <p><CurrencyRupeeIcon />{`${cartItems.reduce(
                        (acc,item)=>acc + item.quantity * item.price,0
                    )}`}</p>
                </div>
                <div></div>
                <div className='checkOutBtn'>
                    <button onClick={checkoutHandler}>Check Out</button>
                </div>
            </div>

        </div>
  </Fragment>)}</Fragment>
      
  )
}

export default Cart