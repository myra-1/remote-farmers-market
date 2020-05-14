import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import './App.css';

import AccountCreate from './Components/AccountCreate'
import AccountAccess from './Components/AccountAccess'
import Header from './Components/Header'
import Main from './Components/Main'
import PostView from './Components/PostView';

import {
  loginUser,
  registerUser,
  verifyUser,
  removeToken,
  getOnePost,
  getAllPosts
} from './Services/api-helper'

class App extends Component {
  state = {
    currentUser: null,
    post: []
  }

  componentDidMount() {
    this.confirmUser();
  }

  // viewPost = async () => {
  //   const post = await getOnePost()
  //   this.setState({ post })
  // }

  //  AUTH BELOW
  handleLogin = async (loginData) => {
    const currentUser = await loginUser(loginData);
    this.setState({ currentUser })
  }

  handleRegister = async (registerData) => {
    const currentUser = await registerUser(registerData);
    this.setState({ currentUser })
  }

  confirmUser = async () => {
    const currentUser = await verifyUser();
    this.setState({ currentUser })
  }

  handleLogout = () => {
    localStorage.clear();
    this.setState({
      currentUser: null
    })
    removeToken();
    this.props.history.push('/login');
  }
  // END AUTH 

  render() {
    return (
      <div className="App">
        <Header handleLogout={this.handleLogout} currentUser={this.state.currentUser} />
        <Route path='/login' render={(props) => (<AccountCreate {...props} handleRegister={this.handleRegister} />)} />
        <Route path='/login' render={(props) => (<AccountAccess {...props} handleLogin={this.handleLogin} />)} />
        <Route path='/main'> <Main /> </Route>
        {/* <Route exact path='/posts/:id' render={(props) => {
          const { id } = props.match.params
          return <PostView postId={id} />
        }} /> */}
        <Route exact path='/posts' component={PostView} />
      </div>
    )
  }
}

export default withRouter(App);