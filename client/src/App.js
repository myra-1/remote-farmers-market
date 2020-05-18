import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import AccountCreate from './Components/AccountCreate'
import AccountAccess from './Components/AccountAccess'
import Header from './Components/Header'
import PostView from './Components/PostView'
import PostEdit from './Components/PostEdit'
import PostIndiv from './Components/PostIndiv'
import PostCreate from './Components/PostCreate'

import {
  loginUser,
  registerUser,
  verifyUser,
  removeToken,
} from './Services/api-helper';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    rest.currentUser
      ? <Component {...props} {...rest} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )} />
)

const UnauthOnlyRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    return (
      !rest.currentUser
        ? <Component {...props} {...rest} />
        : <Redirect to={{
          pathname: '/'
        }} />
    )
  }} />
)

class App extends Component {
  state = {
    currentUser: null,
    post: []
  }

  async componentDidMount() {
    await this.confirmUser();
    debugger;
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
  }
  // END AUTH 

  render() {
    return (
      <div>
        <Header handleLogout={this.handleLogout} currentUser={this.state.currentUser} />
        <UnauthOnlyRoute path='/register' component={AccountCreate} handleRegister={this.handleRegister} currentUser={this.state.currentUser} />
        <UnauthOnlyRoute path='/login' component={AccountAccess} handleLogin={this.handleLogin} currentUser={this.state.currentUser} />
        <Route exact path='/' component={() => <PostView currentUser={this.state.currentUser} />} />
        <PrivateRoute exact path='/posts/:id/view' component={PostIndiv} currentUser={this.state.currentUser} />
        <PrivateRoute exact path='/posts/:id/edit' component={PostEdit} currentUser={this.state.currentUser} />
        <PrivateRoute exact path='/posts/new' component={PostCreate} currentUser={this.state.currentUser} />
      </div>
    )
  }
}

export default withRouter(App);