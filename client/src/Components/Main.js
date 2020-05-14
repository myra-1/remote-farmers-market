import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../Services/api-helper'

class Main extends Component {
  // state = {
  //   posts: []
  // }

  // componentDidMount() { this.readAllPosts() }

  // readAllPosts = async () => {
  //   const posts = await getAllPosts()
  //   this.setState({posts})
  // }

  render() {
    return (
      <>
        <h3>You logged in!</h3>
        <Link to='/posts'>View all posts</Link>
        {/* <Link to={`/posts/${id}`}>Go here</Link> */}
      </>
    )
  }
}
export default Main