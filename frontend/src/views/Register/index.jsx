import React from 'react';

const Register = () => {
  return (
    <form method="POST" action="api/users">
      <p>
        <label>Email Address</label>
        <input type="email" name="email"></input>
      </p>
      <p>
        <label>Password</label>
        <input type="password" name="password"></input>
      </p>
      <p class="full">
        <button type="submit">Submit</button>
      </p>
    </form>
  );
};

export default Register;
