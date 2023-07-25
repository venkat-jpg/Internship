import React from 'react'
import "./css/header.css"
import SearchIcon from '@mui/icons-material/Search';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import { Avatar } from '@mui/material';

function Header({photoURL}) {
  return (
    <div class="header">
         <div className='header__logo'>
         <img src='https://seeklogo.net/wp-content/uploads/2020/11/google-drive-logo.png' alt='Drive' /> 
           <span>Drive</span>
         </div>
         <div className='header__search'>
            <SearchIcon/> 
            <input type='text' placeholder='Search in Drive'/>
            <FormatAlignCenterIcon/>
         </div>
         <div className='header__icons'>
                <span>
                       <HelpIcon/>
                       <SettingsIcon/>
                </span>
                <AppsIcon/>
                <Avatar src={photoURL}/>
                <span>
                    
                    </span>
         </div>
    </div>
  )
}

export default Header