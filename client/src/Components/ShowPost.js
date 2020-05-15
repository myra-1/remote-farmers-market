import React, { Component } from 'react'
import { getOnePost } from '../Services/api-helper'

class ShowPost extends Component {
  constructor(props) {
    super(props)

    this.state = {
      post: null
    }
  }

  componentDidMount() {
    this.setPost()
  }

  setPost = async (id) => {
    const post = await getOnePost(this.props.postId)
    this.setState({ post })
  }

  handleChange = (event) => {
    const { value } = event.target
    this.setState({
      post: value
    })
  }

  render() {
    const { post } = this.state
    return (
      <div>
        {post && (
          <h3>{post.title}</h3>
        )}
      </div>
    )
  }
}

export default ShowPost