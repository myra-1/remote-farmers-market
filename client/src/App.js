import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import './App.css';

import AccountCreate from './Components/AccountCreate'
import AccountAccess from './Components/AccountAccess'
import Header from './Components/Header'
import Main from './Components/Main'
import PostView from './Components/PostView'
import PostEdit from './Components/PostEdit'
import PostIndiv from './Components/PostIndiv'
import PostCreate from './Components/PostCreate'

import {
  loginUser,
  registerUser,
  verifyUser,
  removeToken,
} from './Services/api-helper'

class App extends Component {
  state = {
    currentUser: null,
    post: []
  }

  componentDidMount() {
    this.confirmUser();
  }

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
        <Route path='/register' render={(props) => (<AccountCreate {...props} handleRegister={this.handleRegister} />)} />
        <Route path='/login' render={(props) => (<AccountAccess {...props} handleLogin={this.handleLogin} />)} />
        <Route path='/main'> <Main /> </Route>
        <Route exact path='/posts' component={PostView} />
        <Route exact path='/posts/:id/view' component={PostIndiv} />
        <Route exact path='/posts/:id/edit' component={PostEdit} />
        {this.state.currentUser &&
          <Route exact path='/posts/new' render={(props) => (<PostCreate {...props} currentUser={this.state.currentUser.id} />)} />
        }
      </div>
    )
  }
}

export default withRouter(App);