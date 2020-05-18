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
      }} class="px-4 py-3">
        <h3>Login</h3>
        <div class="form-group">
          <label htmlFor="FormEmail">Email</label>
          <input type="email" class="form-control" id="FormEmail" placeholder="email@example.com"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
        </div>
        <div class="form-group">
          <label htmlFor="FormPassword">Password</label>
          <input type="password" class="form-control" id="FormPassword" placeholder="Password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>

    )
  }
}

export default AccountAccess