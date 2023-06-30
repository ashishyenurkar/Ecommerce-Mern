import React, { Fragment, useEffect, useState } from 'react';
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";

import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors,resetPassword} from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';



function ResetPassword() {

    //Navigate to the diff route after login.
  const { token } = useParams()
  console.log("token", token);
const navigate = useNavigate();
const dispatch = useDispatch();
const alert = useAlert();
    
    const { success,loading,error} = useSelector((state) => state.forgotPassword);
  
 
    const [Password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
   
    
    const  resetPasswordSubmit = (e) => {
        e.preventDefault();
      
        const myForm = new FormData();
        myForm.set("Password", Password);
        myForm.set("confirmPassword", confirmPassword);
      dispatch(resetPassword(token, myForm));
      }
      
     
    useEffect(() => {
        
       
        if (error) {
            alert.error(error);
            dispatch(clearErrors);
        }
    
        if (success) {
            alert.success("Password Updated Succesfully");
            navigate("/login");

          
        }
        
    }, [dispatch, error, alert, navigate, success]);

  return (
    <Fragment>
      {loading ? <Loader/>:(<Fragment>
        <MetaData title={"Reste password"}/>
      <div className='resetPasswordContainer'>
        <div className='resetPasswordBox'>
          <h2 className='resetPasswordHeading'>Update Profile</h2>
        <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
                        >
            
                 {/* new password */}           
                            <div >
              <LockOpenIcon />
              <input type="password"
                placeholder='new Password'
                required
                value={Password}
                onChange={(e)=>setPassword(e.target.value)}
              />
                            </div>
               {/* confirm password */}                
                            <div>
              <LockIcon />
              <input type="password"
                placeholder='confirm Password'
                required
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
              />
            </div>
                            
                <input type="submit" value="Update" className="resetPasswordBtn" />
              </form>
              </div>
          </div>
          </Fragment>)}
    </Fragment>
  )
}

export default ResetPassword