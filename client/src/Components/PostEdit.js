import React, { Component } from 'react'
import { getOnePost, updatePost, destroyPost } from '../Services/api-helper'
import Axios from 'axios'


class PostView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      title: '',
      description: '',
      img_url: '',
      price: '',
      quantity: '',
      contact_info: '',
    }
  }

  async componentDidMount() {
    let { id } = this.props.match.params;
    const postInfo = await getOnePost(id);
    this.setState({
      id: postInfo.id,
      title: postInfo.title,
      description: postInfo.description,
      img_url: postInfo.img_url,
      price: postInfo.price,
      quantity: postInfo.quantity,
      contact_info: postInfo.contact_info,
    })
  }


  // handlePostUpdate = async (id, postInfo) => {
  //   const editPost = await updatePost(id, postInfo)
  //   this.setState(prevState => ({
  //     posts: prevState.posts.map(post => {
  //       return post.id === id ? editPost : post
  //     })
  //   }))
  // }

  handlePostUpdate = async (event) => {
    event.preventDefault()
    let { id } = this.state.id
    let postInfo = await getOnePost(id)
    const editPost = await updatePost(id, postInfo)
    this.setState({ editPost })
  }

  handlePostDelete = async (id) => {
    await destroyPost(id)
    // this.setState(prevState => ({
    //   posts: prevState.posts.filter(post => {
    //     return post.id !== id
    //   })
    // }))
    this.props.history.push('/posts');
  }

  handleChange = (event) => {
    const { value } = event.target
    this.setState({
      name: value
    })
  }

  render() {
    return (
      <>
        <form onSubmit={(event) => {
          event.preventDefault()
          this.handlePostUpdate(this.state.id)
          this.props.history.push('/posts');
        }} >
          <h3>Edit Post</h3>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <button type='submit'>Save</button>
        </form>
        <button onClick={() => { this.handlePostDelete(this.state.id) }}>Delete</button>
      </>
    )
  }
}
export default PostView