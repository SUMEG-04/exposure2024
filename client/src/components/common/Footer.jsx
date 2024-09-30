import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Footer.css'; // Importing the CSS file for styling
import Loader from './Loader';
import { Facebook, Instagram, LinkedIn, X } from '@mui/icons-material';

const Footer = () => {
  
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-about">
          <h2 className="footer-heading">About City General Hospital</h2>
          <p className="footer-text">
            City General Hospital is dedicated to providing top-notch healthcare services with a commitment to 
            patient care, safety, and comfort. Our world-class facilities and expert medical staff ensure the best 
            care for our community.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-links">
          <h2 className="footer-heading">Quick Links</h2>
          <ul className="links-list">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/services" className="footer-link">Services</Link></li>
            <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Information Section */}
        <div className="footer-contact">
          <h2 className="footer-heading">Contact Us</h2>
          <p className="footer-text">
            <strong>Address:</strong>
          </p>
          <p className="footer-text">
            <strong>Phone:</strong>
          </p>
          <p className="footer-text">
            <strong>Email:</strong> <a href="mailto:info@citygeneralhospital.com" className="footer-email"></a>
          </p>
        </div>

        {/* Social Media Section */}
        <div className="footer-social">
          <h2 className="footer-heading">Follow Us</h2>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Facebook/>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <X/>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <LinkedIn/>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Instagram/>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p className="footer-bottom-text">
          &copy; {new Date().getFullYear()} City General Hospital. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
