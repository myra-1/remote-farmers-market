import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import './App.css';

// import AccountCreate from './Components/AccountCreate'
// import AccountAccess from './Components/AccountAccess'
// import PostView from './Components/PostView'
// import PostEdit from './Components/PostEdit'

import Header from './Components/Header'
import Main from './Components/Main'

import {
  loginUser,
  registerUser,
  verifyUser,
  removeToken
} from './Services/api-helper'

class App extends Component {
  state = {
    currentUser: null,
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
        {/* <Route path='/register' render={(props) => (<AccountCreate {...props} handleRegister={this.handleRegister} />)} />
        <Route path='/login' render={(props) => (<AccountAccess {...props} handleLogin={this.handleLogin} />)} /> */}
        <Main
          handleRegister={this.handleRegister}
          handleLogout={this.handleLogout}
          handleLogin={this.handleLogin}
          currentUser={this.state.currentUser}
        />
        {/* <Route exact path='/posts' component={PostView} />
        <Route exact path='/posts/:id' component={PostEdit} /> */}
      </div>
    )
  }
}

export default withRouter(App);