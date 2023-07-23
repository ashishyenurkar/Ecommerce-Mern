import React, { Fragment, useEffect, useState } from 'react'
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector,useDispatch } from 'react-redux';
import { clearErrors, getProductDetails, newReview } from '../../actions/productActions';
import { useParams } from 'react-router-dom';
import ReviewCard from "./ReviewCard.jsx"
import Loader from '../layout/Loader/Loader';
import { useAlert } from "react-alert";
import MetaData from '../layout/MetaData';
import { additemsToCart } from '../../actions/cartAction';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Dialog,DialogActions,DialogContent,DialogTitle,Button, Rating

} from '@mui/material';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';

function ProductDetails() {
    
    
    const { id } = useParams();
    const alert = useAlert() 
    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { success, error: reviewError } = useSelector((state) => state.newReview);
  ;

    const increaseQuantity = () => {
        if (product.stock <= quantity) return  alert.error(`Only ${quantity} products remaining in stock.`);
        const qty = quantity + 1;
        setQuantity(qty);
    }
    const decreaseQuantity = () => {
        if (quantity <= 1) return  alert.error(`You can not decrease quantity less than 1`);
        const qty = quantity - 1;
        setQuantity(qty);
    }

    //add to cart Function.
    const addToCartHandler = () => {
        dispatch(additemsToCart(id, quantity));
        alert.success("Item Added To Cart");
}

    const { product, loading, error } = useSelector((state) => state.productDetails);
   
    useEffect(() => {
        
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Review Submitted Succesfully!")
            dispatch({ type: NEW_REVIEW_RESET })
        }
        

        dispatch(getProductDetails(id))
    }, [dispatch, id, alert, error, reviewError, success]);
    const options = {
        size: "large",
        value: product && product.ratings,
        readOnly: true,
        presion:0.5,
    };
    const submitReviewToggel = () => {
        open ? setOpen(false) : setOpen(true);
    }

    const reviewSubmitHandler = () => {
       
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm));
        setOpen(false);
        
    }
    


    return (
        
        <Fragment>
            {loading ? <Loader /> : (<Fragment>
                <MetaData title={product && `${product.name}---Ecommerce`}/>

            <div className='ProductDetails'>
                <div>
                    <Carousel>
                        {
                        product &&    product.images && product.images.map((item, i) => (
                                <img className='CarouselImage'
                                    key={item.url} src={`${item.url}`} alt={`${i}slide`} />
                            ))
                        }
                    </Carousel>
                </div>
                
                <div>
                
                <div className='detailsBlock-1'>
                    <h2>{product && product.name}</h2>
                    <p>Product # {product && product._id}</p>
                        </div>
                
                <div className='detailsBlock-2'>
                    <Rating {...options} />
                    <span>({product && product.numOfReviews} Reviews)</span>
                </div>
                
                <div className='detailsBlock-3'>
                    <h1><CurrencyRupeeIcon/>{`${product && product.price}`}</h1> 
                    <div className='detailsBlock-3-1'>
                        <div className='detailsBlock-3-1-1'>
                            <button onClick={decreaseQuantity}>-</button>
                            <input readOnly value={quantity} type="number" /> 
                          <button onClick={increaseQuantity}>+</button>  
                        </div>
                        <button disabled={product &&product.Stock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
                        </div>
                        <p>
                            Status:
                            <b className={product && product.Stock < 1 ? "redColor" : "greenColor"}>
                                {product && product.Stock < 1 ? "OutOfStock" : "InStock"}
                            </b>
                        </p>
                    </div>
                    <div className='detailsBlock-4'>
Description : <p>{product && product.description}</p>
                    </div>
                    <button onClick={submitReviewToggel} className='submitReview'>
                        Submit Review
                    </button>
                </div>
            </div>
                <h3 className="reviewsHeading">REVIEWS</h3>
                <Dialog
                area-aria-labelledby='simple-dialog-title'
                    open={open}
                    onClose={submitReviewToggel}
                >
                    <DialogTitle>Submit Review</DialogTitle>
                    <DialogContent className='submitDialog'>
                        <Rating
                            onChange={(e) => setRating(e.target.value)}
                            value={rating}
                            size='large'
                        />
                        <textarea
                            className='submitDialogTextArea'
                            cols="30"
                            rows="5"
                            value={comment}
                            onChange={(e)=>setComment(e.target.value)}
                        >

                        </textarea>
                    </DialogContent>
                    <DialogActions>
                        <Button
                        color='secondary'
                            onClick={() => submitReviewToggel()}>Cancle</Button>
                        <Button
                            color='primary'
                            onClick={reviewSubmitHandler}
                        >Submit</Button>
                    </DialogActions>
                </Dialog>
            {product && product.reviews && product.reviews[0] ? (
                <div className='reviews'>
                    {product.reviews && product.reviews.map((review) => (<ReviewCard key={review._id} review={ review} rating={review.rating} />))}
        </div>
            ) : (<p className='noReviews'>No Reviews Yet</p>)}
      </Fragment>)}
       </Fragment>
  )
}

export default ProductDetails;