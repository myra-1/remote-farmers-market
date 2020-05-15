import React, { Component } from 'react'
import { Link } from 'react-router-dom'


function ReadPosts(props) {
  return (
    <div>
      <h4>RFM Posts</h4>
      {props.posts.map(post => (
        <div key={post.id}>
          {post.title} <br />
          {post.description}
          <br />
          <Link to={`/posts/${post.id}`}>Edit this post</Link>
          <button onClick={() => { props.handlePostDelete(post.id) }}>Delete</button>
          <br /> <br />
        </div>
      ))
      }
      <Link to='/new/posts'><button>New Post</button></Link>
    </div>
  )
}
export default ReadPosts