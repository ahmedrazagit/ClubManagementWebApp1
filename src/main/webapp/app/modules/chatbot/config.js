import { createChatBotMessage } from 'react-chatbot-kit';
import DogPicture from './DogPicture';
import React from 'react';

const botName = 'ChatBot';
const customStyles = {
  botMessageBox: {
    backgroundColor: '#376B7E',
  },
  chatButton: {
    backgroundColor: '#5ccc9d',
  },
};

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
  botName,
  customStyles,
  widgets: [
    {
      widgetName: 'dogPicture',
      widgetFunc: props => <DogPicture {...props} />,
    },
  ],
};

export default config;
