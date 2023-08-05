import React, { Fragment, useEffect, useState } from 'react';
import "./newProduct.css";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { Button } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_USER_RESET } from '../../constants/userConstants';
import { getUserDetails, updateUser,clearErrors } from '../../actions/userAction';
import Loader from '../layout/Loader/Loader';


function UpdateUser() {

  const dispatch = useDispatch()
  const alert = useAlert();
    const navigate = useNavigate();
    const { id } = useParams();

    const { loading, error, user } = useSelector((state) => state.useDetails);
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.profile);
    console.log(" updateLoading", updateLoading)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  

    useEffect(() => {
      
        if (user && user._id !== id) {
            dispatch(getUserDetails(id));
         
        } else {
            setName(user && user.name);
            setEmail(user && user.email);
            setRole(user && user.role);
           
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Successfully user updated");
            navigate("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [dispatch, alert, error, navigate, updateError, isUpdated, user, id]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("role", role);
    
    dispatch(updateUser(id,myForm));
  };

  
  


  return (
    <Fragment>
      <MetaData title={"Create Product"}/>
      <div className='dashboard'>
        <SideBar />
        <div className="newProductContainer">
          {loading ? <Loader /> : (
            <form className='createProductForm'
            onSubmit={updateUserSubmitHandler}
          >
            <h1>Update User</h1>

            <div>
              < PersonIcon/>
              <input type="text"
                placeholder='Name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <MailOutlineIcon/>
              <input type="email"
                              placeholder='Email'
                              value={email}
                required
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            
            <div>
              < VerifiedUserIcon />
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Choose Category</option>
                              <option value="admin">Admin</option>
                              <option value="user">User</option>
              </select>
            </div>
            
           
            
            <Button
              id='createProductBtn'
              type="submit"
             disabled={updateLoading ? true : false || role === "" ? true : false}

            >
             Update User 
            </Button>
</form>)}

        </div>
</div>
    </Fragment>
  )
}



export default UpdateUser;