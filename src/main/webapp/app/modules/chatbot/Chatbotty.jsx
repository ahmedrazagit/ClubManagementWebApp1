

import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './config';
import React from 'react';
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'

function Chatbotty() {
  return (
    <div className="App">
      <header className="App-header">
        <Chatbot
          actionProvider={ActionProvider}
          messageParser={MessageParser}
          config={config}
          headerText='Chatbot'
          placeholderText='Enter message'
          disableScrollToBottom
        />
      </header>
    </div>
  );
}

export default Chatbotty;
