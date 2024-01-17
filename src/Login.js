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
    <div className={`login-container ${flash ? "flash-effect" : ""}`}>
      <form className="login-form" onSubmit={_login}>
        <input
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        {error && <div className="login-error">{error}</div>}
        <button className="login-button" disabled={!username || !password}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
