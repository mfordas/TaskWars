import React from 'react';

class Bar extends React.Component {
  render() {
    return (
      <div className="ui segment">
        <form className="ui form" method="POST" action="api/users">
          <p className="field">
            <label>Name</label>
            <input type="text" name="name"></input>
          </p>
          <p className="field">
            <label>Email Address</label>
            <input type="email" name="email"></input>
          </p>
          <p className="field">
            <label>Password</label>
            <input type="password" name="password"></input>
          </p>
          <p className="field">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword"></input>
          </p>
          <p className="field">
            <div className="ui checkbox">
              <input type="checkbox" tabindex="0" class="hidden"></input>
              <label>I agree to the Terms and Conditions</label>
            </div>
          </p>
          <p classNanme="full">
            <button className="ui purple button" type="submit">Submit</button>
          </p>
        </form>
      </div>
    );
  }
}

export default Bar;