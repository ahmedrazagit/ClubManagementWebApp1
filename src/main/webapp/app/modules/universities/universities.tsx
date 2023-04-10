import React, { useEffect } from 'react';
import './universities.scss';

export const Universities = () => {
  useEffect(() => {
    document.title = 'Forum';
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'left' }}>Universities</h1>
    </div>
  );
};
export default Universities;
