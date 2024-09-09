import React from 'react'
import Logo from "../assets/images/logo.png"

const Navbar = () => {
  return (
    <div className='navbar_main_container'>
      <div className='short_nav_container'>
        <div className='logo_text'>
          <h1>Global Virtual Water Flow Dashboard</h1>
        </div>

        <div className="main_nav__logo">
          <img src={Logo} alt="nav_logo" />
        </div>


      </div>
    </ div>
  )
}

export default Navbar