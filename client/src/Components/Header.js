import React from 'react'
import { Link } from 'react-router-dom'

function Header(props) {
  return (
    <header>
      <h1>REMOTE FARMERS MARKET</h1>
      {
        props.currentUser
          ?
          <>
            <div>
              <p>Hello {props.currentUser.display_name}</p>
              <button onClick={props.handleLogout}>Logout</button>
            </div>
          </>
          :
          <div>
            <Link className="login-register" to="/login">Login</Link>
            <Link className="login-register" to="/register">Register</Link>
          </div>
      }
    </header >
  )
}

export default Header