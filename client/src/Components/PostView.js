import React, { Component } from 'react'
import { getOnePost } from '../Services/api-helper'


class PostView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      post: null,

    }
  }

  componentDidMount() {
    this.setPost()
  }

  setPost = async () => {
    const post = await getOnePost(this.props.postId)
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

export default PostView