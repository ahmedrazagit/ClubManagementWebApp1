import React, { useState } from 'react';
import axios from 'axios';
import './OpenAIChat.css';
interface ChatMessage {
  id: string;
  user: 'user' | 'gpt-3';
  content: string;
}
const apiKey = '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';
const OpenAIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!input.trim()) {
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      user: 'user',
      content: input,
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');

    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-003/completions',
      {
        prompt: `I'm chatting with an AI language model, GPT-3. Please provide helpful and accurate responses to my questions.The questions should be mostly based upon university/school clubs,activites and event management, otherwise respond with "This is out of my programmed scope".\n\nUser: ${userMessage.content}\nGPT-3: `,
        max_tokens: 150,
        n: 1,
        stop: ['\n\n'],
        temperature: 0.5,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const gpt3Response = response.data.choices[0].text.trim();

    if (!gpt3Response) {
      // Retry the request, provide a default response, or handle the empty response in another way
    }

    const gpt3Message: ChatMessage = {
      id: (Date.now() + 1).toString(),
      user: 'gpt-3',
      content: gpt3Response,
    };

    setMessages(prevMessages => [...prevMessages, gpt3Message]);
  };

  return (
    <div className="openai-chat">
      <h1>GPT-3 Chat Room</h1>
      <div className="chatbox">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.user}`}>
            <span className="user">{message.user}:</span> {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input type="text" value={input} onChange={handleInputChange} className="input-field" placeholder="Type your message..." />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default OpenAIChat;
