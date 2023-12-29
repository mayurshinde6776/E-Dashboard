import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Nav=()=>{
const auth= localStorage.getItem('user');
const navigate= useNavigate();

const logout=()=>{
    localStorage.clear();
    navigate('/sigup')
}

    return(
        <div>
<img alt='logo' className='amazon-logo'
src='https://images-na.ssl-images-amazon.com/images/G/01/gc/designs/livepreview/amazon_dkblue_noto_email_v2016_us-main._CB468775337_.png'/>
            {
                auth? 
                 <ul className='nav-ul'>
                <li><Link to='/'>Products</Link></li>
                <li><Link to='/add-product'>Add Products</Link></li>
                <li><Link to='/update'>Update Products</Link></li>
               
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link onClick={logout} to='/signup'>Logout ( { JSON.parse(auth).name })</Link></li>
             </ul> 
             :
             <ul  className='nav-ul nav-right' >
             <li><Link to='/signup'>Sign Up</Link></li>
             <li> <Link to='/login'>Login  </Link></li>
             </ul>
            }
           

                
              
              
        </div>
    )
}

export default Nav;