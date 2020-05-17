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
      <>
        <Link to={`/posts/new`}>Share a post</Link>
        <div className="all-posts">
          {posts.map(post => (
            <div className="all-post-details" key={post.id}>
              <h4>{post.title} </h4>
              {post.img_url ? <img src={post.img_url} width="300" height="300" /> : null}
              <p>{post.description}</p>
              <p>{post.price}</p>
              <p>{post.quantity}</p>
              <h5>Tags:</h5>{post.tags.map(tag => (
                <p>{tag.name}</p>
              ))}
              <br />
              {this.props.currentUser ?
                <button><Link to={`/posts/${post.id}/edit`}>Edit this post</Link></button>
                :
                null
              }
              <button><Link to={`/posts/${post.id}/view`}>View Contact Info</Link></button>
              <br /> <br />
            </div>
          ))
          }

        </div>
      </>
    )
  }
}
export default PostView