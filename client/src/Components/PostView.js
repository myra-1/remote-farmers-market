import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../Services/api-helper'

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
      <div className="all-posts">
        {posts.map(post => (
          <div className="all-post-details" key={post.id}>
            {post.title} <br />
            {post.description} <br />
            {post.img_url ? <img src={post.img_url} width="300" height="300" /> : null}<br />
            {post.price}<br />
            {post.quantity}<br />
            {post.contact_info}<br />
            {post.tags.map(tag => (
              <p>tags:{tag.name}</p>
            ))}
            <br />
            {this.props.currentUser ?
              <button><Link to={`/posts/${post.id}/edit`}>Edit this post</Link></button>
              :
              null
            }
            <button><Link to={`/posts/${post.id}/view`}>See this post</Link></button>
            <br /> <br />
          </div>
        ))
        }
        <button><Link to={`/posts/new`}>Create New</Link></button>

      </div>

    )
  }
}
export default PostView