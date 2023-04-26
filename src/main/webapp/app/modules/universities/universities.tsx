import React, { useState, useEffect } from 'react';
import './universities.scss';

const universities = [
  {
    name: 'American University in Dubai',
    url: 'https://www.aud.edu/',
  },
  {
    name: 'Amity University Dubai',
    url: 'https://amityuniversity.ae/',
  },
  {
    name: 'Birla Institute of Technology and Science, Pilani',
    url: 'https://www.bits-pilani.ac.in/dubai/',
  },
  {
    name: 'De Montfort University Dubai',
    url: 'https://dmudubai.com/',
  },
  {
    name: 'Heriot-Watt University Dubai',
    url: 'https://www.hw.ac.uk/dubai/',
  },
  {
    name: 'Manipal Academy of Higher Education - Dubai',
    url: 'https://www.manipaldubai.com/',
  },
  {
    name: 'Middlesex University Dubai',
    url: 'https://www.mdx.ac.ae/',
  },
  {
    name: 'NYU Abu Dhabi',
    url: 'https://nyuad.nyu.edu/en/',
  },
  {
    name: 'Rochester Institute of Technology of Dubai (RIT Dubai)',
    url: 'https://www.rit.edu/dubai/',
  },
  {
    name: 'University Of Sharjah',
    url: 'https://www.sharjah.ac.ae/en/',
  },
  {
    name: 'University of Wollongong in Dubai',
    url: 'https://www.uowdubai.ac.ae/',
  },
];

export const Universities = () => {
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

  return (
    <div className="universities-box">
      <h1 style={{ textAlign: 'center', fontSize: '48px', color: '#333' }}>Universities</h1>
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
                  <a href={university.url}>{university.name}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Universities;
