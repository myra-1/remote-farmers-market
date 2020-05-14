import React, { Component } from 'react'
import { getOnePost, updatePost } from '../Services/api-helper'


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
  componentDidMount() {
    this.setPost()
  }

  setPost = async () => {
    const postInfo = await getOnePost(this.props.postId)
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

  handlePostUpdate = async (id, postInfo) => {
    const editPost = updatePost(id, postInfo)
    this.setState(prevState => ({
      posts: prevState.posts.map(post => {
        return post.id === id ? editPost : post
      })
    }))
  }

  handleChange = (event) => {
    const { value } = event.target
    this.setState({
      name: value
    })
  }

  render() {
    // const { posts } = this.state
    return (
      <>
        <form onSubmit={(event) => {
          event.preventDefault()
          this.handlePostUpdate(this.state.id, this.state)
        }} >
          <h3>Edit Post</h3>
          <input
            type="text"
            value={this.handleChange}
          />
        </form>
      </>

      // <div>
      //   {posts.map(post => (
      //     <div key={post.id}>{post.title}
      //       {post.description}</div>
      //   ))}
      // </div>
    )
  }
}
export default PostView

