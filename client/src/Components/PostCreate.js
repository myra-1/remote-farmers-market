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
    new_state.postInfo[name] = value;
    this.setState(new_state);
  }

  render() {
    return (
      <>

        <h3>Create Post</h3>
        <form onSubmit={async (event) => {
          event.preventDefault()
          await this.handlePostCreation(this.state.postInfo)
          this.props.history.push('/');
        }} >
          <div class="form-group">
            <label htmlFor="title">Title</label>
            <input class="form-control"
              id="title"
              type="text"
              name="title"
              value={this.state.postInfo.title}
              onChange={this.handleChange}
            />
          </div>
          <div class="form-group">
            <label htmlFor="description" for="formControlTextarea1">Description</label>
            <textarea class="form-control" id="formControlTextarea1" rows="3"
              type="text"
              name="description"
              value={this.state.postInfo.description}
              onChange={this.handleChange}
            />
          </div>
          <div class="form-group">
            <label htmlFor="img_url">Image URL</label>
            <input class="form-control"
              type="text"
              name="img_url"
              value={this.state.postInfo.img_url}
              onChange={this.handleChange}
            />
          </div>
          <div class="form-group">
            <label htmlFor="price">Price</label>
            <input class="form-control"
              type="text"
              name="price"
              value={this.state.postInfo.price}
              onChange={this.handleChange}
            />
          </div>
          <div class="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input class="form-control"
              type="text"
              name="quantity"
              value={this.state.postInfo.quantity}
              onChange={this.handleChange}
            />
          </div>
          <div class="form-group">
            <label htmlFor="contact_info">Contact:</label>
            <input class="form-control"
              type="text"
              name="contact_info"
              value={this.state.postInfo.contact_info}
              onChange={this.handleChange}
            />
          </div>
          <div class="form-group">
            <label htmlFor="tags">Tags</label>
            <select class="form-control" name="tags" multiple onChange={this.handleChange}>
              {this.state.tags.map(t => {
                return <option key={t.id} value={t.id}>{t.name}</option>
              })}
            </select>
            <small id="tagHelp" class="form-text text-muted">Select all that apply</small>
          </div>
          <button class="form-group btn btn-primary">Save</button>
        </form>
        <br />
        <div className="backButtonDiv">
          <button class="btn btn-light"><Link to={'/'}>Nevermind</Link></button>
        </div>
        <br />
        <br />
      </>
    )
  }
}
export default PostCreate