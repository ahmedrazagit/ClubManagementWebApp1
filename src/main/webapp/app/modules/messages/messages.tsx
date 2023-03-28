import React, { useEffect } from 'react';

export const Messages = () => {
  useEffect(() => {
    document.title = 'Messages';
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'left' }}>Messages</h1>
    </div>
  );
};
export default Messages;
