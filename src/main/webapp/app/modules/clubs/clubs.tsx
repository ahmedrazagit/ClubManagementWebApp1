import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './clubs.scss';

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
