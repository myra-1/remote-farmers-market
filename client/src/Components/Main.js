import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { getAllPosts, createPost, updatePost, destroyPost } from '../Services/api-helper'

import ReadPosts from './ReadPosts'
import UpdatePost from './UpdatePost'
import CreatePost from './CreatePost'

class Main extends Component {
  constructor() {
    super()

    this.state = {
      posts: []
    }
  }
  componentDidMount() {
    this.readAllPosts()
  }
  readAllPosts = async () => {
    const posts = await getAllPosts()
    this.setState({ posts })
  }

  handlePostSubmit = async (postInfo) => {
    const newPost = await createPost(postInfo)
    this.setState(prevState => ({
      posts: [...prevState.posts, newPost]
    }))
  }

  handlePostUpdate = async (id, postInfo) => {
    const editPost = await updatePost(id, postInfo)
    this.setState(prevState => ({
      posts: prevState.posts.map(post => {
        return post.id = id ? editPost : post
      })
    }))
  }

  handlePostDelete = async (id) => {
    await destroyPost(id)
    this.setState(prevState => ({
      posts: prevState.posts.filter(post => {
        return post.id !== id
      })
    }))
  }

  render() {
    return (
      <>
        <Route exact path='/posts' render={(props) => (
          <ReadPosts {...props} posts={this.state.posts} />
        )} />
        <Route exact path='posts/:id/edit' render={(props) => {
          const { id } = props.match.params
          return <UpdatePost {...props} handlePostUpdate={this.handlePostUpdate} postId={id} />
        }} />
        <Route path="/newpost" render={(props) => (
          <CreatePost {...props} handlePostSubmit={this.handlePostSubmit} />
        )} />
      </>
    )
  }
}
export default Main