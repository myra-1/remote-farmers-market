import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getOnePost, updatePost, destroyPost, getAllTags } from '../Services/api-helper'



class PostEdit extends Component {
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
      },
      tags: []
    }
  }

  async componentDidMount() {
    let { id } = this.props.match.params;
    const postInfo = await getOnePost(id);
    let tags = await getAllTags();
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
      },
      tags: tags
    })
  }

  handlePostUpdate = async () => {
    let postInfo = this.state.postInfo;
    postInfo.tags = postInfo.tags.map(t => t.id);
    const updatedPost = await updatePost(
      this.state.postInfo.id,
      postInfo)
    console.log(updatedPost);
    this.setState({ postInfo: updatedPost })
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    let new_state = { ...this.state }
    if (name === "tags") {
      var options = event.target.options;
      let tags = [];
      value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          let val = Number(options[i].value);
          value.push(val);
          let tag = this.state.tags.find(t => t.id === val);
          tags.push(tag);
        }
      }

      new_state.postInfo[name] = tags;

    } else {
      new_state.postInfo[name] = value;
    }


    this.setState(new_state);
  }

  handlePostDelete = async (id) => {
    await destroyPost(id)
    this.props.history.push('/');
  }

  render() {
    return (
      <>
        <div className="deleteButtonDiv">
          <button className="deleteButton btn btn-secondary" onClick={() => { this.handlePostDelete(this.state.postInfo.id) }}>Delete</button>
        </div>
        <h3>Edit Post</h3>
        <form onSubmit={async (event) => {
          event.preventDefault()
          await this.handlePostUpdate()
          this.props.history.push('/');
        }} >
          <div class="form-group">
            <label htmlFor="title">Title</label>
            <input class="form-control"
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
          </div >
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
            <select name="tags" class="form-control" multiple onChange={this.handleChange} value={this.state.postInfo.tags.map(t => t.id)}>
              {this.state.tags.map(t => {
                return <option selected key={t.id} value={t.id}>{t.name}</option>
              })}
            </select>
            <small id="tagHelp" class="form-text text-muted">Select all that apply</small>
          </div>
          <button class="form-group btn btn-primary">Save</button>
        </form >
        <div className="backButtonDiv">
          <button class="btn btn-light">
            <Link to={'/'} className="backLink">Back</Link>
          </button>
          <br />
          <br />
          <br />
        </div>
      </>
    )
  }
}
export default PostEdit