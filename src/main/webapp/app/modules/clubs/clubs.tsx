import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './clubs.scss';

export const Clubs = () => {
  useEffect(() => {
    document.title = 'Clubs Page';
  }, []);

  const clubList = [
    { name: 'Club A', description: 'This is club A', members: 50 },
    { name: 'Club B', description: 'This is club B', members: 75 },
    { name: 'Club C', description: 'This is club C', members: 100 },
  ];

  const [selectedClub, setSelectedClub] = useState(null);

  const handleClick = index => {
    setSelectedClub(clubList[index]);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'left' }}>Clubs</h1>
      <ul>
        {clubList.map((club, index) => (
          <li key={index} onClick={() => handleClick(index)}>
            {club.name}
          </li>
        ))}
      </ul>
      {selectedClub && (
        <div>
          <h3>{selectedClub.name}</h3>
          <p>{selectedClub.description}</p>
          <p>Number of members: {selectedClub.members}</p>
        </div>
      )}
    </div>
  );
};

export default Clubs;
