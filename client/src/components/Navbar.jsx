import React from 'react';
import Logo from '../img/logo (1).png'
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../api/Context/authContext.jsx';
import { errorNotification, successNotification } from './Toast.jsx';

const Navbar = () => {

  const {currentUser,logout} = useContext(AuthContext);

  const logoutUser = async() => {
    try {
      await logout({});
      return successNotification("🖥️Thank you for reducing our server load. Much appreciated");
    } catch (error) {
      return errorNotification(error.response.data.message);
    }
  }

  return (
    <div className='navbar'>
    <div className='container'>
      <div className="logo"><Link to='/'><img src={Logo} alt="img" /></Link></div>
      <div className="links">
        <Link className='link' to='/?cat=art'>ART</Link>
        <Link className='link' to='/?cat=science'>SCIENCE</Link>
        <Link className='link' to='/?cat=technology'>TECHNOLOGY</Link>
        <Link className='link' to='/?cat=food'>FOOD</Link>
        <Link className='link' to='/?cat=design'>DESIGN</Link>
        <Link className='link' to='/?cat=cinema'>CINEMA</Link>
        {<span style={{textTransform:'capitalize'}}>{currentUser?.data.username}</span>}
        {currentUser ? <span style={{color:'teal'}} onClick={logoutUser}>Logout</span> : <Link style={{color:'teal'}} className='link' to='/login'>Login</Link>}
        <span className="write"><Link className='link' to='/write'>Write</Link></span> 
      </div>
    </div>
    </div>
  )
}

export default Navbar