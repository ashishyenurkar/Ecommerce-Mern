import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { clearErrors,getAdminProducts,deleteProduct } from '../../actions/productActions';
import SideBar from "./Sidebar";
import {useAlert} from "react-alert";
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

function ProductList() {
  const alert = useAlert()
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector((state) => state.product);


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted succesfully");
      navigate("/admin/dashboard");
      dispatch({type:DELETE_PRODUCT_RESET});
    }

    dispatch(getAdminProducts());
  }, [alert, error, dispatch, isDeleted, deleteError, navigate])
  
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  }

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex:1,
    }
    , {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex:0.3,
        }
    , {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex:0.5,
        }, {
          field: "actions",
          headerName: "Actions",
          type: "number",
          minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
          const productId = params.row.id
        return (
          <Fragment>
            <Link to={`/admin/product/${productId}`}>
              <EditIcon/>
            </Link>
            <Button onClick={()=>deleteProductHandler(productId)}>
              <DeleteIcon/>
            </Button>
              </Fragment>
            )
          }
            }
  ]
  const rows = [];

  products && 
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      })
    });
  
  

  return (
    <Fragment>
      <MetaData title={`All Products - Admin`} />
      <div className='dashboard'>
        <SideBar />
        <div className='productListContainer'>
        <h1 id="productListHeading">All Products</h1>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableRowSelectionOnClick
          className='productListTable'
          autoHeight
        />
</div>
      </div>

   </Fragment>
  )
}

export default ProductList