import React, { Component } from 'react';

class Landing extends Component {
  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <br />
        <form action="/signup" method="post">
          <label>Email</label>
          <input type="text" name="email" />
          <label>Password</label>
          <input type="password" name="password" />
          <button type="submit">Sign up</button>
        </form>
      </div>
    );
  }
}

export default Landing;
