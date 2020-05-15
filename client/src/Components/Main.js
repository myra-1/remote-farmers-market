import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { getAllPosts, createPost, updatePost, destroyPost, getAllUsers } from '../Services/api-helper'

import ReadPosts from './ReadPosts'
import ShowPost from './ShowPost'
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
      // users: []
    }
  }
  componentDidMount() {
    this.readAllPosts()
    // this.readAllUsers()
  }
  readAllPosts = async () => {
    const posts = await getAllPosts()
    this.setState({ posts })
  }

  // readAllUsers = async () => {
  //   const users = await getAllUsers()
  //   this.setState({ users })
  // }

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
        <Header handleLogout={this.props.handleLogout} currentUser={this.props.currentUser} />
        <main>
          <Route path='/register' render={(props) => (<AccountCreate {...props} handleRegister={this.props.handleRegister} />)} />
          <Route path='/login' render={(props) => (<AccountAccess {...props} handleLogin={this.props.handleLogin} />)} />

          <Route exact path='/posts' render={(props) => (<ReadPosts {...props} posts={this.state.posts} currentUser={this.props.currentUser} handlePostDelete={this.handlePostDelete} />)} />
          <Route exact path='/post/:id' render={(props) => { return (<ShowPost id={props.match.params.id} currentUser={this.props.currentUser} />) }} />

          <Route path="/post/new" render={(props) => (<CreatePost {...props} handlePostSubmit={this.handlePostSubmit} currentUser={this.props.currentUser} />)} />
          <Route exact path='posts/:id' render={(props) => {
            const { id } = props.match.params
            return (<UpdatePost {...props} handlePostUpdate={this.handlePostUpdate} postId={id} currentUser={this.props.currentUser} />)
          }} />
        </main>
      </>
    )
  }
}
export default Main