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
    createChatBotMessage("Here's a quick overview over what I need to function:", {
      withAvatar: false,
      delay: 500,
    }),
    createChatBotMessage(`You can prompt me:\n`),
    createChatBotMessage(`Suggestions: To use our AIChatBot\n`),
    createChatBotMessage(`Events: To navigate to our Events page\n`),
    createChatBotMessage(`Clubs: To navigate to our Clubs page\n`),
    createChatBotMessage(`Show pages: To get an overview of all the main pages available in the website\n`),
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
