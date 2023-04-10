import { createChatBotMessage } from 'react-chatbot-kit';
import DogPicture from './DogPicture';
import React from 'react';

const botName = 'PingBot';
const customStyles = {
  botMessageBox: {
    backgroundColor: '#376B7E',
  },
  chatButton: {
    backgroundColor: '#5ccc9d',
  },
};

const config = {
  initialMessages: [createChatBotMessage(`Hi I'm ${botName}. I’m here to help you explain how I work.`)],
  botName,
  customStyles,
};

export default config;
