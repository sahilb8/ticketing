import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {doRequest, errors} = useRequest({
    url:'/api/users/signup',
    method: 'post',
    body: {
      email,
      password
    },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    doRequest();
  };

  return (
    <form onSubmit={onSubmit()}>
      <h1>Sign Up</h1>
      <div class="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.password)}
          type="password"
          class="form-control"
        />
      </div>
      <button class="btn btn-primary">Sign Up</button>
      {errors}
    </form>
  );
};
