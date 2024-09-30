import React from 'react';
import '../../styles/ContactInfo.css'; // Importing the CSS file for styling
import CallIcon from '@mui/icons-material/Call'; // Importing Material UI icon for call
import EmailIcon from '@mui/icons-material/Email'; // Importing Material UI icon for email
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Importing Material UI icon for location

const ContactInfo = () => {


  return (
    <div className="contact-info">
      <h2>Contact Information</h2>
      <div className="contact-item">
        <LocationOnIcon className="contact-icon" />
        <div>
          <strong>Address:</strong>
          <p></p>
        </div>
      </div>
      <div className="contact-item">
        <CallIcon className="contact-icon" />
        <div>
          <strong>Phone:</strong>
          <p></p>
        </div>
      </div>
      <div className="contact-item">
        <EmailIcon className="contact-icon" />
        <div>
          <strong>Email:</strong>
          <p><a href={`mailto:`} className="email-link"></a></p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
