import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../Services/api-helper'

function Main() {

  return (
    <>
      <h3>You logged in!</h3>
      <Link to='/posts'>View all posts</Link>
    </>
  )
}
export default Main