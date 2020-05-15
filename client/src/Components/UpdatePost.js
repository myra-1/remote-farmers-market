import React, { Component } from 'react'
import { getOnePost } from '../Services/api-helper'

class UpdatePost extends Component {

  constructor(props) {
    super(props)

    this.state = {
      id: '',
      title: '',
      description: '',
      img_url: '',
      price: '',
      quantity: '',
      contact_info: '',
    }
  }
  handleChange = (event) => {
    const { value } = event.target
    this.setState({
      name: value
    })
  }
  componentDidMount() {
    this.populatePostInfo()
  }

  populatePostInfo = async () => {
    const thePost = await getOnePost(this.props.postId)
    this.setState({
      title: thePost.title
    })
  }
  render() {
    return (
      <form onSubmit={(event) => {
        event.preventDefault()
        this.props.handlePostUpdate(this.props.postId, this.state)
        this.props.history.push('/posts')
      }}>
        <h2>Edit Yo Info</h2>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <button>Submit</button>
      </form>
    )
  }
}

export default UpdatePost

// constructor(props) {
//   super(props)

//   this.state = {
//     id: '',
//     title: '',
//     description: '',
//     img_url: '',
//     price: '',
//     quantity: '',
//     contact_info: '',
//   }
// }

// async componentDidMount() {
//   let { id } = this.props.match.params;
//   const postInfo = await getOnePost(id);
//   this.setState({
//     id: postInfo.id,
//     title: postInfo.title,
//     description: postInfo.description,
//     img_url: postInfo.img_url,
//     price: postInfo.price,
//     quantity: postInfo.quantity,
//     contact_info: postInfo.contact_info,
//   })
// }

// handlePostUpdate = async (event) => {
//   event.preventDefault()
//   let { id } = this.state.id
//   let postInfo = await getOnePost(id)
//   const editPost = await this.props.handlePostUpdate(id, postInfo)
//   this.setState({ editPost })
// }

// handleChange = (event) => {
//   const { value } = event.target
//   this.setState({
//     name: value
//   })
// }

// render() {
//   return (
//     <>
//       <form onSubmit={(event) => {
//         event.preventDefault()
//         this.handlePostUpdate(this.state.id)
//         this.props.history.push('/posts');
//       }} >
//         <h3>Edit Post</h3>
//         <label htmlFor="title">Title</label>
//         <input
//           type="text"
//           name="title"
//           value={this.state.title}
//           onChange={this.handleChange}
//         />
//         <button type='submit'>Save</button>
//       </form>
//     </>
//   )
// }
