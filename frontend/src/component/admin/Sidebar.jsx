import React from 'react'
import "./sidebar.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png"
import { TreeView,TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';

function Sidebar() {
  return (
      <div className='sidebar'>
          <Link to="/">
              <img src={logo} alt="ecommerce" />
          </Link>
    </div>
  )
}

export default Sidebar