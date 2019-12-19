import React from 'react';
//import Login from '../../components/Login';

const Login = () => {
  //return <Login />;
  return (
    <form method="POST" action="api/auth">
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

export default Login;
