import React from 'react';
import '../../styles/Loader.css'; // Importing the CSS file for styling

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner">
        {/* Main Spinner Elements for Animation */}
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
      <p className="loading-text">Loading, please wait...</p> {/* Informative text */}
    </div>
  );
};

export default Loader;
