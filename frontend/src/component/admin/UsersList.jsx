import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import SideBar from "./Sidebar";
import {useAlert} from "react-alert";

import { getAllUsers, clearErrors, DeleteUser } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstants';

function UsersList() {
  const alert = useAlert()
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { error, users } = useSelector((state) => state.allUsers);
    const { error: deleteError, isDeleted, message} = useSelector((state) => state.profile);


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
      alert.success(message);
      navigate("/admin/users");
      dispatch({type:DELETE_USER_RESET});
    }

     dispatch(getAllUsers());
  }, [alert, error, dispatch, isDeleted, deleteError, navigate, message])
  
  const deleteUserHandler = (id) => {
     dispatch(DeleteUser(id));
  }

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.5 },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex:1,
    }
    , {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex:0.3,
        }
    , {
      field: "role",
      headerName: "Role",
      minWidth: 150,
        flex: 0.3,
        cellClassName: (params) => {
            const userRole = params.row.role;
            return userRole === "admin" ? "greenColor" : "redColor"
            
      }
        }, {
          field: "actions",
          headerName: "Actions",
          type: "number",
          minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
          const userId = params.row.id
        return (
          <Fragment>
            <Link to={`/admin/user/${userId}`}>
              <EditIcon/>
            </Link>
            <Button onClick={()=>deleteUserHandler(userId)}>
              <DeleteIcon/>
            </Button>
              </Fragment>
            )
          }
            }
  ]
  const rows = [];

  users && 
  users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      })
    });
  
  

  return (
    <Fragment>
      <MetaData title={`All Users - Admin`} />
      <div className='dashboard'>
        <SideBar />
        <div className='productListContainer'>
        <h1 id="productListHeading">All USERS</h1>

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



export default UsersList