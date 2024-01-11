import React from 'react';
import {Link} from 'react-router-dom';

const RegistrationComplete = () => {
  return (
    <div>
       <h1>Registration Complete</h1>
                <img src="https://i.makeagif.com/media/2-20-2016/C-jGQN.gif"></img>
                <h3>Please, <Link to="/Login">Login!</Link></h3>
    </div>
  );
};

export default RegistrationComplete;
