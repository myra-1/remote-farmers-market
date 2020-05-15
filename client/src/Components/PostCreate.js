import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getOnePost, createPost } from '../Services/api-helper'



class PostCreate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      postInfo: {
        id: '',
        title: '',
        description: '',
        img_url: '',
        price: '',
        quantity: '',
        contact_info: '',
        user_id: this.props.currentUser
      }
    }
  }

  handlePostCreation = async (postInfo) => {
    const newPost = await createPost(postInfo)
  }

  handleChange = (event) => {
    const { name, value } = event.target
    let new_state = { ...this.state }
    new_state.postInfo[name] = value;
    this.setState(new_state);
  }

  // handlechange for tag

  render() {
    return (
      <>
        <form onSubmit={(event) => {
          event.preventDefault()
          this.handlePostCreation(this.state.postInfo)
          // handlesubmitfortags
          this.props.history.push('/posts');
        }} >
          <h3>Create Post</h3>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={this.state.postInfo.title}
            onChange={this.handleChange}
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={this.state.postInfo.description}
            onChange={this.handleChange}
          />
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            value={this.state.postInfo.price}
            onChange={this.handleChange}
          />
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            name="quantity"
            value={this.state.postInfo.quantity}
            onChange={this.handleChange}
          />
          <label htmlFor="contact_info">Contact:</label>
          <input
            type="text"
            name="contact_info"
            value={this.state.postInfo.contact_info}
            onChange={this.handleChange}
          />
          <button>Save</button>
        </form>
        <br />
        <br />
        <br />
        <button><Link to={'/posts'}>Nevermind</Link></button>
      </>
    )
  }
}
export default PostCreate