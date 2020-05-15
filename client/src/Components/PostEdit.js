import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getOnePost, updatePost, destroyPost } from '../Services/api-helper'



class PostEdit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      postInfo: {
        id: '',
        title: 'hi',
        description: '',
        img_url: '',
        price: '',
        quantity: '',
        contact_info: '',
      }
    }
  }

  async componentDidMount() {
    let { id } = this.props.match.params;
    const postInfo = await getOnePost(id);
    this.setState({
      postInfo: {
        id: postInfo.id,
        title: postInfo.title,
        description: postInfo.description,
        img_url: postInfo.img_url,
        price: postInfo.price,
        quantity: postInfo.quantity,
        contact_info: postInfo.contact_info
      }
    })
  }

  handlePostUpdate = async () => {
    const updatedPost = await updatePost(
      this.state.postInfo.id,
      this.state.postInfo)
    this.setState({ postInfo: updatedPost })
  }

  handleChange = (event) => {
    const { name, value } = event.target
    let new_state = { ...this.state }
    new_state.postInfo[name] = value;
    this.setState(new_state);
  }

  handlePostDelete = async (id) => {
    await destroyPost(id)
    this.props.history.push('/posts');
  }

  render() {
    return (
      <>
        <form onSubmit={async (event) => {
          event.preventDefault()
          await this.handlePostUpdate()
          this.props.history.push('/posts');
        }} >
          <h3>Edit Post</h3>
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
        <button onClick={() => { this.handlePostDelete(this.state.id) }}>Delete</button>
        <br />
        <br />
        <button><Link to={'/posts'}>Back</Link></button>
      </>
    )
  }
}
export default PostEdit