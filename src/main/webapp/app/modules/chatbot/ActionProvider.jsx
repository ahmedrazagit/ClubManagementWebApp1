import React from 'react';


const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const Message = createChatBotMessage('Opening page');
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Nice to meet you.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleButton = () => {
    const botMessage = createChatBotMessage(
      "Here are the links to each page:",
      {
        widget: 'MyButton',
      }
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleClub = () => {
    window.open('/clubs');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, Message],
    }));
  };

  const handleForum = () => {
    window.open('/forum');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, Message],
    }));
  };

  const Eventfunc = () => {
    window.open('/events-page');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, Message],
    }));
  };
  const handleSuggestion = () => {
    window.open('/openAIChatBox');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, Message],
    }));
  };

  const TryAgain = () => {
    const Try = createChatBotMessage('Try again');
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, Try],
    }));
  };







  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleButton,
            handleClub,
            handleForum,
            Eventfunc,
            handleSuggestion,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
