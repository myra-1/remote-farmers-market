import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { createPost, getAllTags } from '../Services/api-helper'



class PostCreate extends Component {
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
        user_id: this.props.currentUser
      },
      tags: []
    }
  }

  async componentDidMount() {
    let tags = await getAllTags();
    this.setState({ ...this.state, tags: tags })
  }

  handlePostCreation = async (postInfo) => {
    let post = postInfo;
    delete post.user_id;
    await createPost(post)
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "tags") {
      var options = event.target.options;
      value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(Number(options[i].value));
        }
      }
    }
    let new_state = { ...this.state }
    console.log(name, value);
    new_state.postInfo[name] = value;
    this.setState(new_state);
  }

  // handlechange for tag

  render() {
    return (
      <>

        <form onSubmit={async (event) => {
          event.preventDefault()
          await this.handlePostCreation(this.state.postInfo)
          // handlesubmitfortags
          this.props.history.push('/');
        }} >
          <h3>Create Post</h3>
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
          <label htmlFor="img_url">Image</label>
          <input
            type="text"
            name="img_url"
            value={this.state.postInfo.img_url}
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
          <label htmlFor="tags">Tags:</label>
          <select name="tags" multiple onChange={this.handleChange}>
            {this.state.tags.map(t => {
              return <option key={t.id} value={t.id}>{t.name}</option>
            })}
          </select>
          <button>Save</button>
        </form>
        <br />
        <br />
        <br />
        <button><Link to={'/posts'}>Nevermind</Link></button>
      </>
    )
  }
}
export default PostCreate