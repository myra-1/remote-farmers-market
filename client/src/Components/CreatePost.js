import React, { Component } from 'react'

class CreatePost extends Component {
  state = {
    title: ''
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({
      name: value
    })
  }

  render() {
    return (
      <form onSubmit={(event) => {
        event.preventDefault()
        this.props.handlePostSubmit(this.state)
        this.props.history.push('/posts')
      }}>
        <h3>Create A Post</h3>
        <input
          type='text'
          value={this.state.title}
          onChange={this.handleChange}
        />
        <button>Submit</button>
      </form>
    )
  }
}

export default CreatePost