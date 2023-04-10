import React, { useEffect } from 'react';
import './forum.scss';

export const Forum = () => {
  useEffect(() => {
    document.title = 'Forum';
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'left' }}>Forum</h1>
    </div>
  );
};
export default Forum;
