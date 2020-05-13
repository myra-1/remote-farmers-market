import React from 'react'
import { Link } from 'react-router-dom'

function Main() {
  return (
    <>
      <h3>You logged in!</h3>
      <Link to='/posts/:id'>Go here</Link>
    </>
  )
}
export default Main