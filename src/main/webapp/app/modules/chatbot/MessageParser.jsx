// in MessageParser.jsx
import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes('hello')) {
      actions.handleHello();
    }
    if (!message.trim()) {
      // Message is empty or only contains whitespace
      return;
    }

    /*if (message.includes('')) {
      actions.handleButton();
    }*/

    /*if (message.toLowerCase().includes('show pages')) {
      actions.handleButton();
    }*/
    if (/show\s+pages/i.test(message)) {
      actions.handleButton();
    }




  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
