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
    this.setPost(this.props.postId)
  }

  setPost = async (postId) => {
    const post = await getOnePost(postId)
    this.setState({ post })
  }

  render() {
    const { post } = this.state
    return (
      <div>
        {post}
      </div>
    )
  }
}

export default ShowPost