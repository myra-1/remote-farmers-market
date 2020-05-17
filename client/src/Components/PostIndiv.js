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
        tags: []
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
        contact_info: postInfo.contact_info,
        tags: postInfo.tags
      }
    })
  }

  render() {
    return (
      <>
        <div className="indivPost">
          <h3 className="indivPostTitle">{this.state.postInfo.title}</h3>
          <p className="postPrice">
            Price: {this.state.postInfo.price}
          </p>
          <p className="postQuantity">
            Quantity per Price: {this.state.postInfo.quantity}
          </p>
          <p className="postContact">
            Contact seller via: {this.state.postInfo.contact_info}
          </p>
          <Link to={'/'} >Go back</Link>
        </div>
      </>
    )
  }
}
export default PostIndiv