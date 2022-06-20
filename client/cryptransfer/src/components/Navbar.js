import React from 'react'
import logo from '../images/logo.png';

const Navbar = () => {
  return (
    <nav className="w-full navbar p-4 md:justify-center sm:justify-center lg:justify-center ">
      <div className="justify-center navbar__logo">
        <img src={logo} alt="logo" className="w-32" />
      </div>
    </nav>
  )
}

export default Navbar;  