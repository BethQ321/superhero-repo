import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [error, setError] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Fname, setFirstName] = useState("");
  const [Lname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/register", {
        username,
        password,
        Fname,
        Lname,
        email,
        phone,
      });
      navigate("/RegistrationComplete");
    } catch (error) {
      setError(
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Registration failed"
      );
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      <form className="form-layout" onSubmit={handleSubmit}>
        <input
          type="text"
          value={Fname}
          onChange={(event) => setFirstName(event.target.value)}
          placeholder="First Name"
          required
          className="form-input"
        />
        <input
          type="text"
          value={Lname}
          onChange={(event) => setLastName(event.target.value)}
          placeholder="Last Name"
          required
          className="form-input"
        />
        <input
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Phone"
          required
          className="form-input"
        />
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          required
          className="form-input"
        />
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          required
          className="form-input"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          required
          className="form-input"
        />
        <button type="submit">
          Register
        </button>
        <a className="nav-link"href={`https://github.com/login/oauth/authorize?client_id=${window.GITHUB_CLIENT}`}>Log in with Github</a>

      </form>
    </div>
  );
};

export default Register;
