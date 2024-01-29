import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'; //to connect to 
import axios from "axios";

const Forums = ({auth}) => {
  const [messages, setMessages] = useState([]);  //holds chat messages
  const [messageInput, setMessageInput] = useState(''); //for new incoming messages
  const [name, setName] = useState(''); //display user name
  const socket = io('https://shield-shop.onrender.com', { transports: ['websocket'] }); // Socket


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
      // Continue with the rest of the logic once fetchUsers is completed
      socket.on('chat-message', (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });
  
      // socket.on('user-connected', (userName) => {
      //   setMessages((prevMessages) => [...prevMessages, { system: `${userName} connected` }]);
      // });
  
      setName((prevName) => prevName || auth.username);
    };
  
    initialize();
  
    return () => {
      socket.disconnect();
    };
  }, [auth.username]);


  const handleFormSubmit = (e) => {
    e.preventDefault();
 
    //iff not empty
    if (messageInput.trim() !== '') {
      const newMessage = { name, message: messageInput };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      
      console.log("socket submit",newMessage)

      // Send message to server
      socket.emit('send-chat-message', newMessage);

      setMessageInput('');
    }
  };

  return (
    <div>

<div id="message-container">
{//console.log("All Users:", users)
}
{messages.map((message, index) => (
  <div key={index} className="message">
    {message.message && message.message.name ? (
      <>
        {users.map((user) => {
          //console.log("User's name in users:", user.username); // Log the username
          if (user.username === message.message.name) {
            //console.log("Matching user found:", user); // Log matching user
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



