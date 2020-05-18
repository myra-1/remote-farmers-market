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
          <button class="btn btn-light">
            <Link to={`/posts/new`} className="sharePostLink">Share a post</Link>
          </button>
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
              {this.props.currentUser && this.props.currentUser.id === post.user_id ?
                <button className="editButton btn btn-light"><Link to={`/posts/${post.id}/edit`}>Edit</Link></button>
                :
                null
              }
              <button className="viewButton btn btn-light"><Link to={`/posts/${post.id}/view`}>Purchase Info</Link></button>
            </div>
          ))
          }

        </div>
      </>
    )
  }
}
export default PostView