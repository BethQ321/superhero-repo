import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'; //added to fix login form issue

const Login = ({ login })=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); //add to fix login form issue

  const _login = async(ev)=> {
    ev.preventDefault();
    try {
      await login({ username, password });
      navigate('/')
    }
    catch(ex){
      console.log(ex.response.data);
    }
  }
  return (
    <form onSubmit={ _login }>
      <input
        placeholder='username'
        value={ username }
        onChange={ ev => setUsername(ev.target.value)}
      />
      <input
        type='password'
        placeholder='password'
        value={ password }
        onChange={ ev => setPassword(ev.target.value)}
      />
      <button disabled={!username || !password}>Login</button>
    </form>
  );
}

export default Login;
