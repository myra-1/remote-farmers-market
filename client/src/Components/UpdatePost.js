import React, { Component } from 'react'
import { getOnePost, updatePost } from '../Services/api-helper'

class UpdatePost extends Component {
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
    this.setState({
      id: this.props.match.params.id
    })
  }


  handlePostUpdate = async (id, postInfo) => {
    const editPost = await updatePost(id, postInfo)
    this.setState(prevState => ({
      posts: prevState.posts.map(post => {
        return post.id === id ? editPost : post
      })
    }))
  }

  handlePostUpdate = async (event) => {
    event.preventDefault()
    let { id } = this.state.id
    let postInfo = await getOnePost(id)
    const editPost = await updatePost(id, postInfo)
    this.setState({ editPost })
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
          <button type='submit'>Save</button>
        </form>
      </>
    )
  }
}
export default UpdatePost