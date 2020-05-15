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
    this.setPost(this.props.id)
  }

  setPost = async (id) => {
    const post = await getOnePost(id)
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