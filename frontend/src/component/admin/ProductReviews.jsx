import React, { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./ProductReview.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { clearErrors,getAllReviews,deleteReview } from '../../actions/productActions';
import SideBar from "./Sidebar";
import {useAlert} from "react-alert";
import {  DELETE_REVIEW_RESET } from '../../constants/productConstants';

function ProductReviews() {
  const alert = useAlert()
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { error: deleteError, isDeleted } = useSelector((state) => state.review);
  const { error, reviews,loading } = useSelector((state) => state.productReviews);
  const [productId, setProductId] = useState("");
  console.log("product id", productId)

  const productReviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
    
  }

  useEffect(() => {

    if (productId.length === 24) {
      dispatch(getAllReviews(productId))
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review Deleted succesfully");
      navigate("/admin/reviews");
      dispatch({type:DELETE_REVIEW_RESET});
    }

    // dispatch(getAdminProducts());
  }, [alert, error, dispatch, isDeleted, deleteError, navigate, productId])
  
  const deleteReviewHandler = (reviewId) => {
    
   
    dispatch(deleteReview(reviewId, productId));
  }

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    
    , {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex:0.6,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex:1,
    }
    , {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => {
        
        return params.row.rating >= 3 ? "greenColor" : "redColor"
        
  }
        }, {
          field: "actions",
          headerName: "Actions",
          type: "number",
          minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
          const reviewId = params.row.id
        return (
          <Fragment>
            <Button onClick={()=>deleteReviewHandler(reviewId)}>
              <DeleteIcon/>
            </Button>
              </Fragment>
            )
          }
            }
  ]
  const rows = [];

  reviews && 
  reviews.forEach((item) => {
      rows.push({
        id: item._id,
       comment: item.comment,
        rating: item.rating,
        user: item.name,
      })
    });
  
  

  return (
    <Fragment>
      <MetaData title={`All REVIEWS - Admin`} />
      <div className='dashboard'>
        <SideBar />
        <div className='productReviewContainer'>
        <form className='productReviewForm'
            onSubmit={(e)=>productReviewSubmitHandler(e)}
          >
            <h1>All REVIEWS</h1>

            <div>
              <StarIcon/>
              <input type="text"
                placeholder='Product ID'
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
           
            
          
            
           
            
            <Button
              id='createProductBtn'
              type="submit"
             disabled={loading ? true : false || productId === "" ? true : false}

            >
            Search  
            </Button>
</form>
{reviews && reviews.length > 0 ? ( <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableRowSelectionOnClick
          className='productListTable'
          autoHeight
          />) : (
              <h1 className='productReviewsFormHeading'>NO Reviews Found</h1>
        )}
       
</div>
      </div>

   </Fragment>
  )
}



export default ProductReviews;