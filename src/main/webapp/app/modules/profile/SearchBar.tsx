import React from 'react';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import './SearchBar.scss';

export const SearchBar = ({ setResults, labels }) => {
  const [input, setInput] = useState('');

  const handleChange = value => {
    setInput(value);
    setResults(
      labels.filter(item => {
        return item.includes(value);
      })
    );
  };
  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input placeholder="type here to search:)" value={input} onChange={e => handleChange(e.target.value)} />
    </div>
  );
};

export default SearchBar;
