import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './announcements.scss';

export const Announcements = () => {
  useEffect(() => {
    document.title = 'Announcements Page';
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'left' }}>Announcements</h1>
    </div>
  );
};

export default Announcements;
