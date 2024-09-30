import React, { useState } from 'react';
import '../styles/ContactUs.css'; // Importing the CSS for styling
import CallIcon from '@mui/icons-material/Call'; // Icon for call
import ContactInfo from '../components/overview/ContactInfo';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Sample contact information (can be fetched from context or props)
  const contactDetails = {
    address: {
      street: '123 Main St',
      city: 'Metropolis',
      state: 'NY',
      zip: '10001',
      country: 'USA',
    },
    phone: '+1 (555) 123-4567',
    email: 'info@hospital.com',
    hours: 'Mon-Fri: 9 AM - 6 PM',
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Logic for sending the form data to a server can be added here
  };

  return (
    <div className="contact-us-page">
      <h1>Contact Us</h1>
      <div className="contact-container">
        <div className="contact-form-container">
          <h2>Send Us a Message</h2>
          {submitted ? (
            <div className="thank-you-message">
              <h3>Thank you for reaching out! We will get back to you shortly.</h3>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          )}
        </div>
        <div className="contact-info-container">
          {/* <ContactInfo contact={contactDetails} /> */}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
