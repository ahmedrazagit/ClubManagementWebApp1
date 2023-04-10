import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './config';
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'

import React from "react";

function Chatbotty() {

  const saveMessages = (messages, HTMLString) => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem('chat_messages'));
    return messages;
  };


  return (
    <div id="chat" style={{ position: "fixed", bottom: 10, right: 10, zIndex: 1000 }}>
        <Chatbot
          actionProvider={ActionProvider}
          messageParser={MessageParser}
          config={config}
          headerText='Chatbot'
          placeholderText='Enter message'
          messageHistory={loadMessages()}
          saveMessages={saveMessages}
        />
    </div>
  );
}

export default Chatbotty;
