import React, { Fragment, useEffect, useState } from 'react';
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";

import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors,updatePassword} from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';



const UpdatePassword = () => {
    //Navigate to the diff route after login.
const navigate = useNavigate();
const dispatch = useDispatch();
const alert = useAlert();
    
    const { isUpdated,loading,error} = useSelector((state) => state.profile);
  
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
   
    
    const  updatePasswordSubmit = (e) => {
        e.preventDefault();
      
        const myForm = new FormData();
    
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm));
      }
      
     
    useEffect(() => {
        
       
        if (error) {
            alert.error(error);
            dispatch(clearErrors);
        }
    
        if (isUpdated) {
            alert.success("Profile Updated Succesfully");
            navigate("/account");

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            })
        }
        
    }, [dispatch, error, alert, navigate, isUpdated]);

    return (
<Fragment>
      {loading ? <Loader/>:(<Fragment>
        <MetaData title={"Change password"}/>
      <div className='updatePasswordContainer'>
        <div className='updatePasswordBox'>
          <h2 className='updatePasswordHeading'>Update Profile</h2>
        <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
                        >
{/* old password */}
            <div className='loginPassword'>
              <VpnKeyIcon />
              <input type="password"
                placeholder='old Password'
                required
                value={oldPassword}
                onChange={(e)=>setOldPassword(e.target.value)}
              />
                            </div>
                 {/* new password */}           
                            <div className='loginPassword'>
              <LockOpenIcon />
              <input type="password"
                placeholder='new Password'
                required
                value={newPassword}
                onChange={(e)=>setNewPassword(e.target.value)}
              />
                            </div>
               {/* confirm password */}                
                            <div className='loginPassword'>
              <LockIcon />
              <input type="password"
                placeholder='confirm Password'
                required
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
              />
            </div>
                            
                <input type="submit" value="Change Password" className="updatePasswordBtn" />
              </form>
              </div>
          </div>
          </Fragment>)}
    </Fragment>
    )
};

export default UpdatePassword;