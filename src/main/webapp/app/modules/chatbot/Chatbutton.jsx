import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './config';
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import './chat.scss';

import React, {useState} from "react";

import {FaCrosshairs, FaQuestion} from "react-icons/fa";
import Chatbotty from "app/modules/chatbot/Chatbotty";

function Chatbutton() {

  //Chatbot code



  const [showBot, setShowBot] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const toggleBot = () => {
    setShowBot((prev) => !prev);
    setButtonClicked(!buttonClicked);
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem('chat_messages'));
    console.log(messages);
    return messages;
  };







  //Chatbot code ends



  return (

    <div className='App'>
      <button
        className={`feedback${buttonClicked ? ' clicked' : ''}`}
        onClick={toggleBot}
      >
        {buttonClicked ? 'Close Chat' : 'Chat Now!'}
      </button>
      {showBot && (
        <Chatbotty />
      )}
    </div>

  );
}

export default Chatbutton;
