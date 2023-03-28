import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './config';
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'

import React from "react";

function Chatbotty() {
  return (
        <Chatbot
          actionProvider={ActionProvider}
          messageParser={MessageParser}
          config={config}
          headerText='Chatbot'
          placeholderText='Enter message'
        />
  );
}

export default Chatbotty;
