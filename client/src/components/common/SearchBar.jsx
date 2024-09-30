import React, { useState } from 'react';
import '../../styles/SearchBar.css'; // Importing the CSS file for styling
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Handle input change and set the query state
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Trigger search when the form is submitted
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query); // Pass the query back to the parent component for filtering data
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="search-input"
        placeholder="Search doctors, departments..."
        aria-label="Search"
      />
      <button type="submit" className="search-button">
      <SearchIcon/>
      </button>
    </form>
  );
};

export default SearchBar;
