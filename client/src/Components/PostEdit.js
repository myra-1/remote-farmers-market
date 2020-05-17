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
        <form onSubmit={async (event) => {
          event.preventDefault()
          await this.handlePostUpdate()
          this.props.history.push('/');
        }} >
          <h3>Edit Post</h3>
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
          <label htmlFor="img_url">Image URL</label>
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
          <select name="tags" multiple onChange={this.handleChange} value={this.state.postInfo.tags.map(t => t.id)}>
            {this.state.tags.map(t => {
              return <option key={t.id} value={t.id}>{t.name}</option>
            })}
          </select>
          <button>Save</button>
        </form>
        <br />
        <br />
        <button onClick={() => { this.handlePostDelete(this.state.postInfo.id) }}>Delete</button>
        <br />
        <br />
        <button><Link to={'/'}>Back</Link></button>
      </>
    )
  }
}
export default PostEdit