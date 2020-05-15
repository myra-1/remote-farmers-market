import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getOnePost, updatePost, destroyPost } from '../Services/api-helper'



class PostIndiv extends Component {
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

  render() {
    return (
      <>
        <div>
          {this.state.postInfo.title} <br />
          {this.state.postInfo.description} <br />
          {this.state.postInfo.img_url} <br />
          {this.state.postInfo.price} <br />
          {this.state.postInfo.quantity} <br />
          {this.state.postInfo.contact_info}<br />
        </div>
        <Link to={'/posts'}>Back</Link>
      </>
    )
  }
}
export default PostIndiv