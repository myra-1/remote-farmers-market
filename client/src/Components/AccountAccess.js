import React, { Component } from 'react'

class AccountAccess extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    const { email, password } = this.state;
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        this.props.handleLogin(this.state);
        this.props.history.push('/main');
      }}>
        <h3>Login</h3>
        <label htmlFor="email">email:</label>
        <input
          id="email"
          type="text"
          name="email"
          value={email}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="password">password:</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={this.handleChange}
        />
        <br />
        <button>Submit</button>
      </form>

    )
  }
}

export default AccountAccess