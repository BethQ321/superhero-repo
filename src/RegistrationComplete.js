import React from "react";
import { Link } from "react-router-dom";

const RegistrationComplete = () => {
  return (
    <div className="registration-complete-container">
      <h1>Registration Complete</h1>
      <img
        className="registration-complete-image"
        src="https://i.makeagif.com/media/2-20-2016/C-jGQN.gif"
        alt="Registration Complete"
      />
      <h3>
        Please,{" "}
        <Link to="/Login" className="a-link">
          Login!
        </Link>
      </h3>
    </div>
  );
};

export default RegistrationComplete;
