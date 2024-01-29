import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'; 
import axios from "axios";

const Forums = ({auth}) => {
  const [messages, setMessages] = useState([]); 
  const [messageInput, setMessageInput] = useState(''); 
  const [name, setName] = useState(''); 
  const socket = io('https://shield-shop.onrender.com', { transports: ['websocket'] }); 


  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
  
    const initialize = async () => {
      await fetchUsers();
      socket.on('chat-message', (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });
  
  
      setName((prevName) => prevName || auth.username);
    };
  
    initialize();
  
    return () => {
      socket.disconnect();
    };
  }, [auth.username]);


  const handleFormSubmit = (e) => {
    e.preventDefault();
 
    if (messageInput.trim() !== '') {
      const newMessage = { name, message: messageInput };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      
      console.log("socket submit",newMessage)

      socket.emit('send-chat-message', newMessage);

      setMessageInput('');
    }
  };

  return (
    <div>

<div id="message-container">

{messages.map((message, index) => (
  <div key={index} className="message">
    {message.message && message.message.name ? (
      <>
        {users.map((user) => {
          if (user.username === message.message.name) {
            return (
              <img
                key={user.username}
                src={user.image}
                alt="Profile"
                className="profile-image"
              />
            );
          }
          return null;
        })}
        <span>{`${message.message.name}: ${message.message.message}`}</span>
      </>
    )  : null}
  </div>
        ))}
      </div>

      <form id="send-container" onSubmit={handleFormSubmit}>
        <input
          type="text"
          id="message-input"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button type="submit" id="send-button"> Send </button>
      </form>


    </div>
  );
};

export default Forums;



