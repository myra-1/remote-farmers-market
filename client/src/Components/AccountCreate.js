import React, { Component } from 'react'

class AccountCreate extends Component {
  state = {
    display_name: '',
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
    const { display_name, email, password } = this.state;
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        this.props.handleRegister(this.state);
        this.props.history.push('/');
      }}>
        <h3>Register</h3>
        <label htmlFor="display_name">Name:</label>
        <input
          id="display_name"
          type="text"
          name="display_name"
          value={display_name}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          name="email"
          value={email}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="password">Password:</label>
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

export default AccountCreate