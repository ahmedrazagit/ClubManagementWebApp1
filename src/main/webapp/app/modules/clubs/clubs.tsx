import React, { useEffect } from 'react';

export const Clubs = () => {
  useEffect(() => {
    document.title = 'Clubs Page';
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'left' }}>Clubs</h1>
    </div>
  );
};
export default Clubs;
