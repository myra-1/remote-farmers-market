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
      }} class="px-4 py-3">
        <h3>Register</h3>
        <div class="form-group">
          <label htmlFor="DisplayName">Name</label>
          <input type="name" class="form-control" id="DisplayName" placeholder="John Smith"
            type="text"
            name="display_name"
            value={display_name}
            onChange={this.handleChange}
          />
        </div>
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
      </form >
    )
  }
}

export default AccountCreate