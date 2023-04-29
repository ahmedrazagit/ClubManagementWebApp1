import React from 'react';

import './SearchResult.scss';

export const SearchResult = ({ result }) => {
  return (
    <span className="search-result" onClick={e => alert(`You selected ${result}!`)}>
      {result}
    </span>
  );
};
export default SearchResult;
