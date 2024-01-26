import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'; //to connect to 

const Forums = ({auth}) => {
  const [messages, setMessages] = useState([]);  //holds chat messages
  const [messageInput, setMessageInput] = useState(''); //for new incoming messages
  const [name, setName] = useState(''); //display user name
  const socket = io('http://localhost:5502'); // Socket

  useEffect(() => {
    
    // Incoming chat messages
    socket.on('chat-message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });


    // For user connected - Doesn't work
    socket.on('user-connected', (userName) => {
      setMessages((prevMessages) => [...prevMessages, { system: `${userName} connected` }]);
    });

    // Event listener for user disconnected
    socket.on('user-disconnected', (userName) => {
      setMessages((prevMessages) => [...prevMessages, { system: `${userName} disconnected` }]);
    });

    
    setName(auth.username);

    return () => {
      
      socket.disconnect();
    };
  }, [auth.username, socket]); 

  const handleFormSubmit = (e) => {
    e.preventDefault();
 
    //iff not empty
    if (messageInput.trim() !== '') {
      const newMessage = { name, message: messageInput };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Send message to server
      socket.emit('send-chat-message', newMessage);

      setMessageInput('');
    }
  };

  return (
    <div>
      <div id="message-container">
        {/*Each bit of the array */}
        {messages.map((message, index) => (
          <div key={index}>
            {message.system ? (
              <span style={{ color: 'gray' }}>{message.system}</span>
            ) : (
              <span>{`${message.name}: ${message.message}`}</span>
            )}
          </div>
        ))}
      </div>
      {/* */}
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



