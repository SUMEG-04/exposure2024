import React from 'react';
import { Link } from 'react-router-dom'; // To allow navigation back to home
import '../styles/NotFound.css'; // Importing the CSS file for styling

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>The page you are looking for doesn't exist or an error occurred.</p>
      <Link to="/" className="home-button">Go Back to Homepage</Link>
    </div>
  );
};

export default NotFound;
