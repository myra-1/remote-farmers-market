import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { getAllPosts, createPost, updatePost, destroyPost, getAllUsers } from '../Services/api-helper'

import ReadPosts from './ReadPosts'
import UpdatePost from './UpdatePost'
import CreatePost from './CreatePost'
import AccountAccess from './AccountAccess'
import AccountCreate from './AccountCreate'
import Header from './Header'

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      users: []
    }
  }
  componentDidMount() {
    this.readAllPosts()
    this.readAllUsers()
  }
  readAllPosts = async () => {
    const posts = await getAllPosts()
    this.setState({ posts })
  }

  readAllUsers = async () => {
    const users = await getAllUsers()
    this.setState({ users })
  }

  handlePostSubmit = async (postInfo) => {
    const newPost = await createPost(postInfo)
    this.setState(prevState => ({
      posts: [...prevState.posts, newPost]
    }))
  }

  handlePostUpdate = async (postId, postInfo) => {
    const editPost = await updatePost(postId, postInfo)
    this.setState(prevState => ({
      posts: prevState.posts.map(post => {
        return post.id = postId ? editPost : post
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
        <Route path='/register' render={(props) => (<AccountCreate {...props} handleRegister={this.props.handleRegister} />)} />
        <Route path='/login' render={(props) => (<AccountAccess {...props} handleLogin={this.props.handleLogin} />)} />
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