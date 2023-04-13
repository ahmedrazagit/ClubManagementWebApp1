import { createChatBotMessage } from 'react-chatbot-kit';
import React from 'react';
import MyButton from 'app/modules/chatbot/MyButton';

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
  initialMessages: [
    createChatBotMessage(`Hi I'm ${botName}. I’m here to help you explain how I work.`),
    /*createChatBotMessage(
      "Here's a quick overview over what I need to function. ask me about the different parts to dive deeper.",
      {
        withAvatar: false,
        delay: 500,
      }
    ),*/
    createChatBotMessage('Hello! Here are your pages: ', {
      widget: 'MyButton',
    }),
  ],
  botName,
  customStyles,
  widgets: [
    {
      widgetName: 'MyButton',
      widgetFunc: props => <MyButton {...props} />,
    },
  ],
};

export default config;
