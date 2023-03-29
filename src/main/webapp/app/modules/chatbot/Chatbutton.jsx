import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './config';
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import './chat.scss';

import React, {useState} from "react";

import {FaCrosshairs, FaQuestion} from "react-icons/fa";

function Chatbutton() {

  //Chatbot code
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  //Chatbot code ends



  return (
    <div className="chat-button-container">
      <button className="chat-button" onClick={toggleChat}>
        <FaQuestion />
      </button>
      {isChatOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <button className="close-button" onClick={toggleChat}>
              <FaCrosshairs />
            </button>
          </div>
          <Chatbot
            actionProvider={ActionProvider}
            messageParser={MessageParser}
            config={config}
            headerText="Chatbot"
            placeholderText="Enter message"
          />
        </div>
      )}
    </div>

  );
}

export default Chatbutton;
