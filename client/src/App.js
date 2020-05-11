import React, { Component } from 'react';
import './App.css';

import AccountCreate from './Components/AccountCreate'
import {
  loginUser,
  registerUser,
  verifyUser,
  removeToken
} from './Services/api-helper'

class App extends Component {
  state = {
    currentUser: null
  }

  componentDidMount() {
    this.confirmUser();
  }

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
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="App">
        <AccountCreate handleRegister={this.handleRegister} />

      </div>
    )
  }
}

export default App;