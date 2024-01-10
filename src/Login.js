import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'; //added to fix login form issue

const Login = ({ login })=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); //add to fix login form issue
  const [error, setError] = useState ('') //added for login error

  const [flash, setFlash] = useState(false); //make screen flash

  const _login = async(ev)=> {
    ev.preventDefault();
    try {
      await login({ username, password });
      navigate('/')
    }
    catch(ex){
      console.log(ex.response.data);
      setError(
        <>
        "Invalid login credentials. Nice try, Joker!" <br/> - Batman
        </>
      );
      setFlash(true);
    }
  }

useEffect(() => {
  if (flash) {
    const timer = setTimeout(() => {
      setFlash(false);
    }, 5000);
    return () => clearTimeout((timer))
  }
}, [flash]);


  return (
    <div className={flash ? 'flash-effect' : ''}>
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
      {error && <div className="error">{error}</div>} {/*Displays error on front end*/}
      <button disabled={!username || !password}>Login</button>
    </form>
    </div>
  );
}

export default Login;
