import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [flash, setFlash] = useState(false);

  const _login = async (ev) => {
    ev.preventDefault();
    try {
      await login({ username, password });
      navigate("/");
    } catch (ex) {
      console.log(ex.response.data);
      setError(
        <>
          "Invalid login credentials. Nice try, Joker!" <br /> - Batman
        </>
      );
      setFlash(true);
    }
  };

  useEffect(() => {
    if (flash) {
      const timer = setTimeout(() => {
        setFlash(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  return (
    <div className={`form-container ${flash ? "flash-effect" : ""}`}>
      <form className="form-layout" onSubmit={_login}>
        <input
        type="text"
          className="form-input"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          className="form-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        {error && <div className="error">{error}</div>}
        <button disabled={!username || !password}>
          Login
        </button>
      <a className="nav-link"href={`https://github.com/login/oauth/authorize?client_id=${window.GITHUB_CLIENT}`}>Log in with Github</a>
      </form>
      
    </div>
  );
};

export default Login;
