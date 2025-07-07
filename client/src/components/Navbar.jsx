import React from 'react';
import Logo from '../img/logo (1).png'
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
    <div className='container'>
      <div className="logo"><img src={Logo} alt="img" /></div>
      <div className="links">
        <Link className='link' to='/?cat=art'>ART</Link>
        <Link className='link' to='/?cat=science'>SCIENCE</Link>
        <Link className='link' to='/?cat=technology'>TECHNOLOGY</Link>
        <Link className='link' to='/?cat=food'>FOOD</Link>
        <Link className='link' to='/?cat=design'>DESIGN</Link>
        <Link className='link' to='/?cat=cinema'>CINEMA</Link>
        <span>John</span>
        <span>Logout</span>
        <span className="write"><Link className='link' to='/write'>Write</Link></span> 
      </div>
    </div>
    </div>
  )
}

export default Navbar