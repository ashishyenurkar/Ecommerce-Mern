import React, { Fragment, useState } from 'react'
import "./Header.css";
import {
    SpeedDial, SpeedDialAction
} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';
import { useDispatch } from 'react-redux';


function UserOptions({ user }) {
    const dispatch = useDispatch();
    
    const alert = useAlert();
    
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        {icon:<PersonIcon/>,name:"Profile",func:account},
       {icon:<ExitToAppIcon/>,name:"Logout",func:logoutUser},
    ]

    if (user.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "DashBoard",
            func: dashboard,
        })
    }

    //SpeedDial Functions.
    function dashboard() {
        navigate("/dashboard")
    }
    function orders() {
        navigate("/orders")
    }
    
    function account() {
        navigate("/account")
    }
 function logoutUser() {
    dispatch(logout())
     alert.success("Logged Out Succesfully !")
      
    }
  return (
      <Fragment>
          <Backdrop open={open} style={{zIndex:"10"}} />
          <SpeedDial
              className='speedDial'
              style={{zIndex:"11"}}
              ariaLabel='SpeedDial tooltip example'
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              direction='down'
              icon={
                  <img
                      className='speedDialIcon'
                      src={user.avatar.url ? user.avatar.url :"/Profile.png"}
                      alt='Profile'
                  />
          }  
          >
              {/* Speed Dial Actions */}
              {options.map((item) => (
                  <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name}
                  onClick={item.func}
                  />
              ))}
          </SpeedDial>      
    </Fragment>
  )
}

export default UserOptions