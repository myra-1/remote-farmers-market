import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { getOnePost, getAllPosts } from '../Services/api-helper'

import PostEdit from './PostEdit'
import Main from './Main'


class PostView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: []
    }
  }
  componentDidMount() {
    this.setPosts()
  }
  setPosts = async () => {
    const posts = await getAllPosts()
    this.setState({ posts })
  }
  render() {
    const { posts } = this.state
    return (
      <div>
        {posts.map(post => (
          <div key={post.id}>
            {post.title} <br />
            {post.description}
            <Link to={`/posts/${post.id}`}>See More</Link>
            <br /> <br />
          </div>
        ))
        }
      </div>
    )
  }
}
export default PostView


{/* <button>
<Route exact path='/posts/:id' render={(props) => {
  const { id } = props.match.params
  return <PostView postId={id} />
}} />See More</button> */}