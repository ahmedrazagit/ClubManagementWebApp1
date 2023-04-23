import React, { useEffect } from 'react';
import './OpenAIChat.css';

export const OpenAIChat = () => {
  useEffect(() => {
    document.title = 'Forum';
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'left' }}>AI Advice Bot</h1>
    </div>
  );
};
export default OpenAIChat;
