import React from 'react';

class Bar extends React.Component {
  render() {
    return (
      <div className="ui segment">
        <form className="ui form" method="POST" action="api/auth">
          <p className="field">
            <label>Email Address</label>
            <input type="email" name="email"></input>
          </p>
          <p className="field">
            <label>Password</label>
            <input type="password" name="password"></input>
          </p>
          <p class="full">
            <button class="ui purple button" type="submit">Submit</button>
          </p>
        </form>
      </div>
    );
  }
}

export default Bar;