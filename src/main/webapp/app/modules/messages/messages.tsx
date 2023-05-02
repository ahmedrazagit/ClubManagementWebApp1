/*import React, { useEffect } from 'react';

function Messages() {
  return (
    <div>
      <iframe src="https://deadsimplechat.com/8EKgMwNNIG" width="100%" height="600px"></iframe>
    </div>
  );
}
export default Messages;*/

import React, { useState, useEffect } from 'react';
import './messages.scss';

const universities = [
  {
    name: 'University of Birmingham Dubai',
    url: './birminghamdubaichat',
    passcode: 'OldJoeAtBirmingham',
  },
  {
    name: 'Heriot Watt University Dubai',
    url: './heriotwattdubaichat',
    passcode: 'ScotlandInDubai',
  },
];

export const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.title = 'Universities';
  }, []);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const filteredUniversities = universities.filter(university => university.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const groupedUniversities = {};
  filteredUniversities.forEach(university => {
    const firstLetter = university.name.charAt(0).toUpperCase();
    if (!groupedUniversities[firstLetter]) {
      groupedUniversities[firstLetter] = [university];
    } else {
      groupedUniversities[firstLetter].push(university);
    }
  });

  const handleLinkClick = university => {
    const passcode = prompt('Enter the passcode:');
    if (passcode === university.passcode) {
      window.location.href = university.url;
    } else {
      alert('Incorrect passcode!');
    }
  };

  return (
    <div className="universities-box">
      <h1 style={{ textAlign: 'center', fontSize: '48px', color: '#333' }}>University Club Chat Rooms</h1>
      <h1 style={{ textAlign: 'center', fontSize: '18px', color: '#333' }}>
        To enter a chat room, click the link and enter the secret passcode your university has given you. <br />
        Can't find your university here? Just have your university contact us at{' '}
        <a href="clubpingforbusiness@gmail.com">clubpingforbusiness@gmail.com</a> <br /> and we will register a chat room for your
        university.
      </h1>
      <div className="search-container">
        <input type="text" placeholder="Search for a university" value={searchTerm} onChange={handleSearchChange} />
        <i className="fa fa-search search-icon" />
      </div>
      <div className="universities-container">
        {Object.keys(groupedUniversities).map(key => (
          <div key={key} className="group-container">
            <h2>{key}</h2>
            <ul>
              {groupedUniversities[key].map(university => (
                <li key={university.name} className="university-item">
                  <a href="javascript:void(0)" onClick={() => handleLinkClick(university)}>
                    {university.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
