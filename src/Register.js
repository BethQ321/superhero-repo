import {React, UseState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[Fname, setFirstName] = useState('');
  const[Lname, setLastName] = useState('');
  const[email, setEmail] = useState('');
  const[phone, SetPhone] = useState('');



    return (
      <div>
        <p>Register stuff goes here</p>
      </div>
    );
  };

export default Register