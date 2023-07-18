import React from 'react'
import { Link } from 'react-router-dom'
import './CartItemCard.css';

function CartItemCard({item,deleteCartItems}) {
  return (
      <div className='CartItemCart'>
          <img src={item.image} alt="product" />
          <div>
              <Link to={`/product/${item.product}`}>{item.name}</Link>
              <span>{`Price: Rs${item.price}`}</span>
              <p onClick={()=>deleteCartItems(item.product)}>Remove</p>
          </div>
    </div>
  )
}

export default CartItemCard