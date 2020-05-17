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
        <div className="sharePostDiv">
          <Link to={`/posts/new`} className="sharePostLink">Share a post</Link>
        </div>
        <div className="all-posts">
          {posts.map(post => (
            <div className="all-post-details" key={post.id}>
              <h3 className="postTitle">{post.title} </h3>
              {/* <p className="postPrice">Price: {post.price}</p>
              <p className="postQuantity">Quantity: {post.quantity}</p> */}
              {post.img_url ? <img src={post.img_url} width="300" height="300" className="postImg" /> : null}
              <p className="postDescription">{post.description}</p>
              <div className="postTags">{post.tags.map(tag => (
                <p className="postTagSingle">{tag.name}</p>
              ))}
              </div>
              {this.props.currentUser ?
                <button className="editButton"><Link to={`/posts/${post.id}/edit`}>Edit this post</Link></button>
                :
                null
              }
              <button className="viewButton"><Link to={`/posts/${post.id}/view`}>View Purchase Info</Link></button>
            </div>
          ))
          }

        </div>
      </>
    )
  }
}
export default PostView