import React from 'react'
import { Link } from 'react-router-dom'

function Header(props) {
  return (
    <header>
      <h1>HELLO</h1>
      {
        props.currentUser
          ?
          <>
            <p>{props.currentUser.display_name}</p>
            <button onClick={props.handleLogout}>Logout</button>
          </>
          :
          <Link to="/login">Login/Register</Link>
      }
    </header >
  )
}

export default Header