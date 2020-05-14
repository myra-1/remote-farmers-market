import React, { Component } from 'react'
import { getOnePost, getAllPosts } from '../Services/api-helper'


class PostView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: []
    }
  }
  componentDidMount() {
    this.setPost()
  }
  setPost = async () => {
    const posts = await getAllPosts()
    this.setState({ posts })
  }
  render() {
    const { posts } = this.state
    return (
      <div>
        {posts.map(post => (
          <div key={post.id}>{post.title}
            {post.description}</div>
        ))}
      </div>
    )
  }
}
export default PostView