import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getOnePost, updatePost, destroyPost } from '../Services/api-helper'



class PostEdit extends Component {
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

  // handlePostUpdate = async (event) => {
  //   // event.preventDefault()
  //   let { id } = this.state.postInfo.postInfo.id
  //   let postInfo = await getOnePost(id)
  //   const editPost = await updatePost(id, postInfo)
  //   this.setState({ editPost })
  // }

  handlePostUpdate = async (id, postInfo) => {
    const updatedPost = await updatePost(id, postInfo)
    this.setState(prevState => ({
      postInfo: prevState.postInfo.map(post => {
        return postInfo.id === id ? updatedPost : post
      })
    }))
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      postInfo: {
        ...this.state,
        name: value
      }
    })
  }

  handlePostDelete = async (id) => {
    await destroyPost(id)
    this.props.history.push('/posts');
  }

  render() {
    return (
      <>
        <form onSubmit={(event) => {
          event.preventDefault()
          this.handlePostUpdate(this.state.postInfo.postInfo.id)
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
        <Link to={'/posts'}>Back</Link>
      </>
    )
  }
}
export default PostEdit