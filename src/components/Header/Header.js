import React from 'react'
import './Header.css'
function Header() {
  function logoutFnc(){
    alert("You have successfully logged out")
  }

  return (
    <div className='navbar'>
      <p className='logo'>Financely</p>
      <p className='logo link' onClick={logoutFnc}>Logout</p>
    </div>
  )
}

export default Header