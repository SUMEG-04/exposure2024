import React, { useContext } from 'react';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import '../../styles/Navbar.css'; // Importing the CSS file for styling
import SearchBar from './SearchBar';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {

  const { user, logout } =useContext(AuthContext) ; // Get user and logout function from AuthContext
  const history = useNavigate();
  console.log(user)

  const handleLogout = () => {
      logout(); // Call logout function from context
      history('/login'); // Redirect to login page
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="logo">
          <Link to="/">
            <img src="/assets/logo.png" alt="Logo" className="logo-img" />
          </Link>
          <h1 className="logo-text">DSA Tracker</h1>
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/services" className="nav-item">Services</Link>
          <Link to="/contact" className="nav-item">Contact</Link>
          {user ? ( // Conditional rendering based on user authentication state
                    <>
                        <li>
                            <Link to="/dashboard" className="nav-item">Dashboard</Link>
                        </li>
                        <li>
                            <button className="navbar-logout" onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                      <Link to="/login" className="nav-item">Login</Link>
                      <Link to="/signup" className="nav-item">Sign Up</Link>
                    </>
                )}
        </nav>

        {/* Search Bar */}
        {/* <div className="search-container">
          <input type="text" placeholder="Search doctors, departments..." className="search-input" />
          <button className="search-button">🔍</button>
        </div> */}
        {/* <SearchBar onSearch={handleSearch}/> */}
      </div>
    </header>
  );
};

export default Navbar;
